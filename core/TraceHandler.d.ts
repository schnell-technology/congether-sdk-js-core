import { EndpointLogEvent, EndpointMetricEvent } from "./IClientService";
import { CongetherClient } from "./CongetherClient";
export declare class TraceHandler {
    private _client;
    private static maxQueueLength;
    private queueRunning;
    private lastSend;
    private lastLog;
    private _pendingQueues;
    private _currentQueue;
    constructor(_client: CongetherClient);
    log(log: EndpointLogEvent): Promise<void>;
    metric(metric: EndpointMetricEvent): Promise<void>;
    private getCurrentQueue();
    private workQueue();
    private sendQueue(queueToSend);
}
