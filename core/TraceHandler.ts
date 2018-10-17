import { EndpointMessageQueue, EndpointLogEvent, EndpointMessage, EndpointMetricEvent } from "./IClientService";
import { CongetherClient } from "./CongetherClient";
import * as moment from 'moment';

export class TraceHandler {

    private static maxQueueLength : number = 100;

    private queueRunning: boolean = false;
    private lastSend: Date = null;
    private lastLog: Date = null;

    private _pendingQueues: Array<EndpointMessageQueue> = new Array<EndpointMessageQueue>();
    private _currentQueue: EndpointMessageQueue;
    

    constructor(private _client: CongetherClient) {
        setInterval(() => { this.workQueue(); }, 10000);
    }

    public async log(log: EndpointLogEvent) {
        var queue = await this.getCurrentQueue();
        var msg = new EndpointMessage();
        msg.timestamp = moment(new Date());
        msg.logEvent = log.clone();
        queue.content.push(msg)

        if (queue.content.length > TraceHandler.maxQueueLength) {
            this.workQueue();
        }
    }

    public async metric(metric: EndpointMetricEvent) {
        var queue = await this.getCurrentQueue();
        var msg = new EndpointMessage();
        msg.timestamp = moment(new Date());
        msg.metricEvent = metric.clone();
        queue.content.push(msg)

        if (queue.content.length > TraceHandler.maxQueueLength) {
            this.workQueue();
        }
    }

    private async getCurrentQueue(): Promise<EndpointMessageQueue> {
        if (this._currentQueue == null) {
            var queue = new EndpointMessageQueue();
            queue.content = new Array<EndpointMessage>();
            this._currentQueue = queue;
        }

        return this._currentQueue;
    }

    private async workQueue() {
        if (this.queueRunning)
            return;

        this.queueRunning = true;

        this._pendingQueues.forEach(async q => {
            await this.sendQueue(q);
        });

        if (this._currentQueue != null) {
            var queueToSend = this._currentQueue;
            this._currentQueue = null;

            queueToSend.rand = Math.floor(Math.random() * 10000).toString();
            queueToSend.endpoint = await this._client.getManifest();

            await this.sendQueue(queueToSend);
        }

        this.queueRunning = false;
    }

    private async sendQueue(queueToSend: EndpointMessageQueue) :Promise<void> {
        try {
            if (queueToSend.content.length > 0) {
                queueToSend.endpoint = await this._client.getEndpointInfo();
                await this._client.sendQueue(queueToSend);
            }
            let idxOfQueue = this._pendingQueues.indexOf(queueToSend);
            if (idxOfQueue >= 0) {
                this._pendingQueues.splice(idxOfQueue, 1);
            }
        }
        catch (ex) {
            let idxOfQueue = this._pendingQueues.indexOf(queueToSend);
            if (idxOfQueue < 0) {
                this._pendingQueues.push(queueToSend);
            }
        }
    }
}