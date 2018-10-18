import * as client from './IClientService'
import { CongetherFile } from './CongetherFile'
import * as moment_ from 'moment';
const moment = moment_;
import { EndpointManifest, EndpointInfo, EndpointMessageQueue } from './IClientService';
import { TraceHandler } from './TraceHandler';
import { ConductorHandler } from './ConductorHandler';


export * from './IClientService';
export * from './CongetherFile';
export * from './TraceHandler';

export abstract class CongetherClient {

    protected _client: client.IClientService;
    protected _endpointProvider: IEndpointInfoProvider;
    protected _fileHandler: ICongetherFileHandler;
    private _latestCachedManifest: client.EndpointManifest = null;
    private _latestEndpointRequest: Date = null;

    private _deviceIdentifier : string;
    private _commonCongetherFile: CongetherFile;
    private _appCongetherFile: CongetherFile;

    protected _appIdentifier: string;
    protected _version: string;
    protected _baseUrl: string;
    protected _endpoint: string; 
    protected _secret: string;

    public get appIdentifier(): string { return this._appIdentifier; }
    public get version(): string { return this._version; }
    public get baseUrl(): string { return this._baseUrl; }
    public get deviceIdentifier(): string { return this._deviceIdentifier; }

    private _traceHandler: TraceHandler;
    private _conductorHandler: ConductorHandler;

    private get requiresManifestFromService(): boolean {
        return this._latestEndpointRequest == null || (this._latestEndpointRequest != null && moment(this._latestEndpointRequest).add(30, "m").isBefore(moment(new Date())));
    }

    public get tracer(): TraceHandler { return this._traceHandler; }
    public get conductor(): ConductorHandler { return this._conductorHandler; }

    public constructor() {
        this._traceHandler = new TraceHandler(this);
        this._conductorHandler = new ConductorHandler(this);
    }

    public async sendQueue(queue: EndpointMessageQueue) {
        await this._client.postEvent(this._endpoint, queue);
    }

    protected abstract onInitialized();

    public initialize(appIdentifier: string, baseUrl: string, endpoint: string, secret: string, deviceIdentifier:string = null, version: string = null) {
        this._appIdentifier = appIdentifier;
        this._version = version;
        this._baseUrl = baseUrl;
        this._endpoint = endpoint;
        this._secret = secret;     
        this._deviceIdentifier = deviceIdentifier;   
        
        this.getCongetherFiles();
        this.onInitialized();

    }

    private async getCongetherFiles() : Promise<void> {
        this._commonCongetherFile = await this._fileHandler.getCommonCongetherFile();
        this._appCongetherFile = await this._fileHandler.getAppCongetherFile();
    }

    public async getManifest(): Promise<EndpointManifest> {
        var manifest: EndpointManifest;

        if (this.requiresManifestFromService) {
            manifest = await this.getManifestFromService();
            if (manifest != null) {
                await this._fileHandler.setCachedEndpointManifest(manifest);
                this._latestCachedManifest = manifest;

                if (manifest.endpoint.deviceId != null && manifest.endpoint.deviceId != this._commonCongetherFile.instanceId) {
                    this._commonCongetherFile.instanceId = manifest.endpoint.deviceId;
                    this._fileHandler.setCommonCongetherFile(this._commonCongetherFile);
                }

                if (manifest.endpoint.installationId != null && manifest.endpoint.installationId != this._appCongetherFile.instanceId) {
                    this._appCongetherFile.instanceId = manifest.endpoint.installationId;
                    this._fileHandler.setAppCongetherFile(this._appCongetherFile);
                }
            }
        }
        if (manifest == null && this._latestCachedManifest == null) {
            manifest = await this._fileHandler.getCachedEndpointManifest();
            this._latestCachedManifest = manifest;
        }
        if (manifest == null && this._latestCachedManifest != null)
            manifest = this._latestCachedManifest;

        return manifest;
        
    }

    private async getManifestFromService(): Promise<EndpointManifest> {
        var commonFile = this._commonCongetherFile;
        var appFile = this._appCongetherFile;

        var manifest: EndpointManifest = null;
        var endpoint: EndpointInfo = await this.getEndpointInfo();
        this._latestEndpointRequest = new Date();
        try {
            manifest = await this._client.postManifestRequest(this._endpoint, endpoint);
        }
        catch (ex) {
            console.error(ex);
            manifest = null;
        }
        return manifest;
    }

    public async getEndpointInfo(): Promise<EndpointInfo> {
        return this._endpointProvider.getEndpointInfo(this);
    }

}

export interface IEndpointInfoProvider {
    getEndpointInfo(client : CongetherClient): Promise<EndpointInfo>;
}

export interface ICongetherFileHandler {
    getCommonCongetherFile(): Promise<CongetherFile>
    getAppCongetherFile(): Promise<CongetherFile>

    setCommonCongetherFile(file: CongetherFile): Promise<void>
    setAppCongetherFile(file: CongetherFile): Promise<void>

    setCachedEndpointManifest(endpointManifest: EndpointManifest): Promise<void>
    getCachedEndpointManifest(): Promise<EndpointManifest>
}