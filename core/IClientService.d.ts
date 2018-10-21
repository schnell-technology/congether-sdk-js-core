import * as moment_ from 'moment';
export interface IClientService {
    /**
     * @param eventQueue (optional)
     * @return Success
     */
    postEvent(endpoint: string, eventQueue: EndpointMessageQueue | null | undefined): Promise<void>;
    /**
     * @param endpointInfo (optional)
     * @return Success
     */
    postManifestRequest(endpoint: string, endpointInfo: EndpointInfo | null | undefined): Promise<EndpointManifest>;
}
export declare class EndpointMessageQueue implements IEndpointMessageQueue {
    rand?: string | null;
    endpoint?: EndpointInfo | null;
    content?: EndpointMessage[] | null;
    constructor(data?: IEndpointMessageQueue);
    init(data?: any): void;
    static fromJS(data: any): EndpointMessageQueue;
    toJSON(data?: any): any;
    clone(): EndpointMessageQueue;
}
export interface IEndpointMessageQueue {
    rand?: string | null;
    endpoint?: EndpointInfo | null;
    content?: EndpointMessage[] | null;
}
export declare class EndpointInfo implements IEndpointInfo {
    privacyPolicy?: string | null;
    installationId?: string | null;
    deviceId?: string | null;
    appIdentifier?: string | null;
    appVersion?: string | null;
    deviceKey?: string | null;
    environment?: Environment | null;
    constructor(data?: IEndpointInfo);
    init(data?: any): void;
    static fromJS(data: any): EndpointInfo;
    toJSON(data?: any): any;
    clone(): EndpointInfo;
}
export interface IEndpointInfo {
    privacyPolicy?: string | null;
    installationId?: string | null;
    deviceId?: string | null;
    appIdentifier?: string | null;
    appVersion?: string | null;
    deviceKey?: string | null;
    environment?: Environment | null;
}
export declare class EndpointMessage implements IEndpointMessage {
    timestamp?: moment_.Moment | null;
    appEvent?: EndpointAppEvent | null;
    logEvent?: EndpointLogEvent | null;
    metricEvent?: EndpointMetricEvent | null;
    constructor(data?: IEndpointMessage);
    init(data?: any): void;
    static fromJS(data: any): EndpointMessage;
    toJSON(data?: any): any;
    clone(): EndpointMessage;
}
export interface IEndpointMessage {
    timestamp?: moment_.Moment | null;
    appEvent?: EndpointAppEvent | null;
    logEvent?: EndpointLogEvent | null;
    metricEvent?: EndpointMetricEvent | null;
}
export declare class Environment implements IEnvironment {
    platform?: string | null;
    architectureIdentifier?: string | null;
    runtimeIdentifier?: string | null;
    oSVersion?: string | null;
    address?: string | null;
    hostname?: string | null;
    constructor(data?: IEnvironment);
    init(data?: any): void;
    static fromJS(data: any): Environment;
    toJSON(data?: any): any;
    clone(): Environment;
}
export interface IEnvironment {
    platform?: string | null;
    architectureIdentifier?: string | null;
    runtimeIdentifier?: string | null;
    oSVersion?: string | null;
    address?: string | null;
    hostname?: string | null;
}
export declare class EndpointAppEvent implements IEndpointAppEvent {
    appVersion?: string | null;
    type?: EndpointAppEventType | null;
    constructor(data?: IEndpointAppEvent);
    init(data?: any): void;
    static fromJS(data: any): EndpointAppEvent;
    toJSON(data?: any): any;
    clone(): EndpointAppEvent;
}
export interface IEndpointAppEvent {
    appVersion?: string | null;
    type?: EndpointAppEventType | null;
}
export declare class EndpointLogEvent implements IEndpointLogEvent {
    identifier?: string | null;
    content?: VariantValue | null;
    details?: string | null;
    constructor(data?: IEndpointLogEvent);
    init(data?: any): void;
    static fromJS(data: any): EndpointLogEvent;
    toJSON(data?: any): any;
    clone(): EndpointLogEvent;
}
export interface IEndpointLogEvent {
    identifier?: string | null;
    content?: VariantValue | null;
    details?: string | null;
}
export declare class EndpointMetricEvent implements IEndpointMetricEvent {
    identifier?: string | null;
    value?: number | null;
    constructor(data?: IEndpointMetricEvent);
    init(data?: any): void;
    static fromJS(data: any): EndpointMetricEvent;
    toJSON(data?: any): any;
    clone(): EndpointMetricEvent;
}
export interface IEndpointMetricEvent {
    identifier?: string | null;
    value?: number | null;
}
export declare class VariantValue implements IVariantValue {
    boolValue?: boolean | null;
    numberValue?: number | null;
    dateTimeValue?: moment_.Moment | null;
    stringValue?: string | null;
    constructor(data?: IVariantValue);
    init(data?: any): void;
    static fromJS(data: any): VariantValue;
    toJSON(data?: any): any;
    clone(): VariantValue;
}
export interface IVariantValue {
    boolValue?: boolean | null;
    numberValue?: number | null;
    dateTimeValue?: moment_.Moment | null;
    stringValue?: string | null;
}
export declare class EndpointManifest implements IEndpointManifest {
    endpoint?: EndpointInfo | null;
    configuration?: any | null;
    appInfo?: AppInfo | null;
    constructor(data?: IEndpointManifest);
    init(data?: any): void;
    static fromJS(data: any): EndpointManifest;
    toJSON(data?: any): any;
    clone(): EndpointManifest;
}
export interface IEndpointManifest {
    endpoint?: EndpointInfo | null;
    configuration?: any | null;
    appInfo?: AppInfo | null;
}
export declare class AppInfo implements IAppInfo {
    hasUpdate?: boolean | null;
    constructor(data?: IAppInfo);
    init(data?: any): void;
    static fromJS(data: any): AppInfo;
    toJSON(data?: any): any;
    clone(): AppInfo;
}
export interface IAppInfo {
    hasUpdate?: boolean | null;
}
export declare enum EndpointAppEventType {
    Common = "Common",
    ProvisionVersion = "ProvisionVersion",
    ProvisionDevice = "ProvisionDevice",
    ProvisionInstallation = "ProvisionInstallation"
}
export declare class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: {
        [key: string]: any;
    };
    result: any;
    constructor(message: string, status: number, response: string, headers: {
        [key: string]: any;
    }, result: any);
    protected isSwaggerException: boolean;
    static isSwaggerException(obj: any): obj is SwaggerException;
}
