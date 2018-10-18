import * as client from './IClientService';
import { CongetherFile } from './CongetherFile';
import { EndpointManifest, EndpointInfo, EndpointMessageQueue } from './IClientService';
import { TraceHandler } from './TraceHandler';
import { ConductorHandler } from './ConductorHandler';
export * from './IClientService';
export * from './CongetherFile';
export * from './TraceHandler';
export declare abstract class CongetherClient {
    protected _client: client.IClientService;
    protected _endpointProvider: IEndpointInfoProvider;
    protected _fileHandler: ICongetherFileHandler;
    private _latestCachedManifest;
    private _latestEndpointRequest;
    private _deviceIdentifier;
    private _commonCongetherFile;
    private _appCongetherFile;
    protected _appIdentifier: string;
    protected _version: string;
    protected _baseUrl: string;
    protected _endpoint: string;
    protected _secret: string;
    readonly appIdentifier: string;
    readonly version: string;
    readonly baseUrl: string;
    readonly deviceIdentifier: string;
    private _traceHandler;
    private _conductorHandler;
    private readonly requiresManifestFromService;
    readonly tracer: TraceHandler;
    readonly conductor: ConductorHandler;
    constructor();
    sendQueue(queue: EndpointMessageQueue): Promise<void>;
    protected abstract onInitialized(): any;
    initialize(appIdentifier: string, baseUrl: string, endpoint: string, secret: string, deviceIdentifier?: string, version?: string): void;
    private getCongetherFiles();
    getManifest(): Promise<EndpointManifest>;
    private getManifestFromService();
    getEndpointInfo(): Promise<EndpointInfo>;
}
export interface IEndpointInfoProvider {
    getEndpointInfo(client: CongetherClient): Promise<EndpointInfo>;
}
export interface ICongetherFileHandler {
    getCommonCongetherFile(): Promise<CongetherFile>;
    getAppCongetherFile(): Promise<CongetherFile>;
    setCommonCongetherFile(file: CongetherFile): Promise<void>;
    setAppCongetherFile(file: CongetherFile): Promise<void>;
    setCachedEndpointManifest(endpointManifest: EndpointManifest): Promise<void>;
    getCachedEndpointManifest(): Promise<EndpointManifest>;
}
