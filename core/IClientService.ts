﻿/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.18.6.0 (NJsonSchema v9.10.67.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import * as moment_ from 'moment';
const moment = moment_;


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


export class EndpointMessageQueue implements IEndpointMessageQueue {
    rand?: string | null;
    endpoint?: EndpointInfo | null;
    content?: EndpointMessage[] | null;

    constructor(data?: IEndpointMessageQueue) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.rand = data["Rand"] !== undefined ? data["Rand"] : <any>null;
            this.endpoint = data["Endpoint"] ? EndpointInfo.fromJS(data["Endpoint"]) : <any>null;
            if (data["Content"] && data["Content"].constructor === Array) {
                this.content = [];
                for (let item of data["Content"])
                    this.content.push(EndpointMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): EndpointMessageQueue {
        data = typeof data === 'object' ? data : {};
        let result = new EndpointMessageQueue();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Rand"] = this.rand !== undefined ? this.rand : <any>null;
        data["Endpoint"] = this.endpoint ? this.endpoint.toJSON() : <any>null;
        if (this.content && this.content.constructor === Array) {
            data["Content"] = [];
            for (let item of this.content)
                data["Content"].push(item.toJSON());
        }
        return data; 
    }

    clone(): EndpointMessageQueue {
        const json = this.toJSON();
        let result = new EndpointMessageQueue();
        result.init(json);
        return result;
    }
}

export interface IEndpointMessageQueue {
    rand?: string | null;
    endpoint?: EndpointInfo | null;
    content?: EndpointMessage[] | null;
}

export class EndpointInfo implements IEndpointInfo {
    privacyPolicy?: string | null;
    installationId?: string | null;
    deviceId?: string | null;
    appIdentifier?: string | null;
    appVersion?: string | null;
    deviceKey?: string | null;
    environment?: Environment | null;

    constructor(data?: IEndpointInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.privacyPolicy = data["PrivacyPolicy"] !== undefined ? data["PrivacyPolicy"] : <any>null;
            this.installationId = data["InstallationId"] !== undefined ? data["InstallationId"] : <any>null;
            this.deviceId = data["DeviceId"] !== undefined ? data["DeviceId"] : <any>null;
            this.appIdentifier = data["AppIdentifier"] !== undefined ? data["AppIdentifier"] : <any>null;
            this.appVersion = data["AppVersion"] !== undefined ? data["AppVersion"] : <any>null;
            this.deviceKey = data["DeviceKey"] !== undefined ? data["DeviceKey"] : <any>null;
            this.environment = data["Environment"] ? Environment.fromJS(data["Environment"]) : <any>null;
        }
    }

    static fromJS(data: any): EndpointInfo {
        data = typeof data === 'object' ? data : {};
        let result = new EndpointInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["PrivacyPolicy"] = this.privacyPolicy !== undefined ? this.privacyPolicy : <any>null;
        data["InstallationId"] = this.installationId !== undefined ? this.installationId : <any>null;
        data["DeviceId"] = this.deviceId !== undefined ? this.deviceId : <any>null;
        data["AppIdentifier"] = this.appIdentifier !== undefined ? this.appIdentifier : <any>null;
        data["AppVersion"] = this.appVersion !== undefined ? this.appVersion : <any>null;
        data["DeviceKey"] = this.deviceKey !== undefined ? this.deviceKey : <any>null;
        data["Environment"] = this.environment ? this.environment.toJSON() : <any>null;
        return data; 
    }

    clone(): EndpointInfo {
        const json = this.toJSON();
        let result = new EndpointInfo();
        result.init(json);
        return result;
    }
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


export class EndpointMessage implements IEndpointMessage {
    timestamp?: moment_.Moment | null;
    appEvent?: EndpointAppEvent | null;
    logEvent?: EndpointLogEvent | null;
    metricEvent?: EndpointMetricEvent | null;

    constructor(data?: IEndpointMessage) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.timestamp = data["Timestamp"] ? moment(data["Timestamp"].toString()) : <any>null;
            this.appEvent = data["AppEvent"] ? EndpointAppEvent.fromJS(data["AppEvent"]) : <any>null;
            this.logEvent = data["LogEvent"] ? EndpointLogEvent.fromJS(data["LogEvent"]) : <any>null;
            this.metricEvent = data["MetricEvent"] ? EndpointMetricEvent.fromJS(data["MetricEvent"]) : <any>null;
        }
    }

    static fromJS(data: any): EndpointMessage {
        data = typeof data === 'object' ? data : {};
        let result = new EndpointMessage();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>null;
        data["AppEvent"] = this.appEvent ? this.appEvent.toJSON() : <any>null;
        data["LogEvent"] = this.logEvent ? this.logEvent.toJSON() : <any>null;
        data["MetricEvent"] = this.metricEvent ? this.metricEvent.toJSON() : <any>null;
        return data; 
    }

    clone(): EndpointMessage {
        const json = this.toJSON();
        let result = new EndpointMessage();
        result.init(json);
        return result;
    }
}

export interface IEndpointMessage {
    timestamp?: moment_.Moment | null;
    appEvent?: EndpointAppEvent | null;
    logEvent?: EndpointLogEvent | null;
    metricEvent?: EndpointMetricEvent | null;
}

export class Environment implements IEnvironment {
    platform?: string | null;
    architectureIdentifier?: string | null;
    runtimeIdentifier?: string | null;
    oSVersion?: string | null;
    address?: string | null;
    hostname?: string | null;

    constructor(data?: IEnvironment) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.platform = data["Platform"] !== undefined ? data["Platform"] : <any>null;
            this.architectureIdentifier = data["ArchitectureIdentifier"] !== undefined ? data["ArchitectureIdentifier"] : <any>null;
            this.runtimeIdentifier = data["RuntimeIdentifier"] !== undefined ? data["RuntimeIdentifier"] : <any>null;
            this.oSVersion = data["OSVersion"] !== undefined ? data["OSVersion"] : <any>null;
            this.address = data["Address"] !== undefined ? data["Address"] : <any>null;
            this.hostname = data["Hostname"] !== undefined ? data["Hostname"] : <any>null;
        }
    }

    static fromJS(data: any): Environment {
        data = typeof data === 'object' ? data : {};
        let result = new Environment();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Platform"] = this.platform !== undefined ? this.platform : <any>null;
        data["ArchitectureIdentifier"] = this.architectureIdentifier !== undefined ? this.architectureIdentifier : <any>null;
        data["RuntimeIdentifier"] = this.runtimeIdentifier !== undefined ? this.runtimeIdentifier : <any>null;
        data["OSVersion"] = this.oSVersion !== undefined ? this.oSVersion : <any>null;
        data["Address"] = this.address !== undefined ? this.address : <any>null;
        data["Hostname"] = this.hostname !== undefined ? this.hostname : <any>null;
        return data; 
    }

    clone(): Environment {
        const json = this.toJSON();
        let result = new Environment();
        result.init(json);
        return result;
    }
}

export interface IEnvironment {
    platform?: string | null;
    architectureIdentifier?: string | null;
    runtimeIdentifier?: string | null;
    oSVersion?: string | null;
    address?: string | null;
    hostname?: string | null;
}

export class EndpointAppEvent implements IEndpointAppEvent {
    appVersion?: string | null;
    type?: EndpointAppEventType | null;

    constructor(data?: IEndpointAppEvent) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.appVersion = data["AppVersion"] !== undefined ? data["AppVersion"] : <any>null;
            this.type = data["Type"] !== undefined ? data["Type"] : <any>null;
        }
    }

    static fromJS(data: any): EndpointAppEvent {
        data = typeof data === 'object' ? data : {};
        let result = new EndpointAppEvent();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["AppVersion"] = this.appVersion !== undefined ? this.appVersion : <any>null;
        data["Type"] = this.type !== undefined ? this.type : <any>null;
        return data; 
    }

    clone(): EndpointAppEvent {
        const json = this.toJSON();
        let result = new EndpointAppEvent();
        result.init(json);
        return result;
    }
}

export interface IEndpointAppEvent {
    appVersion?: string | null;
    type?: EndpointAppEventType | null;
}

export class EndpointLogEvent implements IEndpointLogEvent {
    identifier?: string | null;
    content?: VariantValue | null;
    details?: string | null;

    constructor(data?: IEndpointLogEvent) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.identifier = data["Identifier"] !== undefined ? data["Identifier"] : <any>null;
            this.content = data["Content"] ? VariantValue.fromJS(data["Content"]) : <any>null;
            this.details = data["Details"] !== undefined ? data["Details"] : <any>null;
        }
    }

    static fromJS(data: any): EndpointLogEvent {
        data = typeof data === 'object' ? data : {};
        let result = new EndpointLogEvent();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Identifier"] = this.identifier !== undefined ? this.identifier : <any>null;
        data["Content"] = this.content ? this.content.toJSON() : <any>null;
        data["Details"] = this.details !== undefined ? this.details : <any>null;
        return data; 
    }

    clone(): EndpointLogEvent {
        const json = this.toJSON();
        let result = new EndpointLogEvent();
        result.init(json);
        return result;
    }
}

export interface IEndpointLogEvent {
    identifier?: string | null;
    content?: VariantValue | null;
    details?: string | null;
}

export class EndpointMetricEvent implements IEndpointMetricEvent {
    identifier?: string | null;
    value?: number | null;

    constructor(data?: IEndpointMetricEvent) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.identifier = data["Identifier"] !== undefined ? data["Identifier"] : <any>null;
            this.value = data["Value"] !== undefined ? data["Value"] : <any>null;
        }
    }

    static fromJS(data: any): EndpointMetricEvent {
        data = typeof data === 'object' ? data : {};
        let result = new EndpointMetricEvent();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Identifier"] = this.identifier !== undefined ? this.identifier : <any>null;
        data["Value"] = this.value !== undefined ? this.value : <any>null;
        return data; 
    }

    clone(): EndpointMetricEvent {
        const json = this.toJSON();
        let result = new EndpointMetricEvent();
        result.init(json);
        return result;
    }
}

export interface IEndpointMetricEvent {
    identifier?: string | null;
    value?: number | null;
}

export class VariantValue implements IVariantValue {
    boolValue?: boolean | null;
    numberValue?: number | null;
    dateTimeValue?: moment_.Moment | null;
    stringValue?: string | null;

    constructor(data?: IVariantValue) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.boolValue = data["BoolValue"] !== undefined ? data["BoolValue"] : <any>null;
            this.numberValue = data["NumberValue"] !== undefined ? data["NumberValue"] : <any>null;
            this.dateTimeValue = data["DateTimeValue"] ? moment(data["DateTimeValue"].toString()) : <any>null;
            this.stringValue = data["StringValue"] !== undefined ? data["StringValue"] : <any>null;
        }
    }

    static fromJS(data: any): VariantValue {
        data = typeof data === 'object' ? data : {};
        let result = new VariantValue();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["BoolValue"] = this.boolValue !== undefined ? this.boolValue : <any>null;
        data["NumberValue"] = this.numberValue !== undefined ? this.numberValue : <any>null;
        data["DateTimeValue"] = this.dateTimeValue ? this.dateTimeValue.toISOString() : <any>null;
        data["StringValue"] = this.stringValue !== undefined ? this.stringValue : <any>null;
        return data; 
    }

    clone(): VariantValue {
        const json = this.toJSON();
        let result = new VariantValue();
        result.init(json);
        return result;
    }
}

export interface IVariantValue {
    boolValue?: boolean | null;
    numberValue?: number | null;
    dateTimeValue?: moment_.Moment | null;
    stringValue?: string | null;
}

export class EndpointManifest implements IEndpointManifest {
    endpoint?: EndpointInfo | null;
    configuration?: any | null;
    appInfo?: AppInfo | null;

    constructor(data?: IEndpointManifest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.endpoint = data["Endpoint"] ? EndpointInfo.fromJS(data["Endpoint"]) : <any>null;
            this.configuration = data["Configuration"] !== undefined ? data["Configuration"] : <any>null;
            this.appInfo = data["AppInfo"] ? AppInfo.fromJS(data["AppInfo"]) : <any>null;
        }
    }

    static fromJS(data: any): EndpointManifest {
        data = typeof data === 'object' ? data : {};
        let result = new EndpointManifest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Endpoint"] = this.endpoint ? this.endpoint.toJSON() : <any>null;
        data["Configuration"] = this.configuration !== undefined ? this.configuration : <any>null;
        data["AppInfo"] = this.appInfo ? this.appInfo.toJSON() : <any>null;
        return data; 
    }

    clone(): EndpointManifest {
        const json = this.toJSON();
        let result = new EndpointManifest();
        result.init(json);
        return result;
    }
}

export interface IEndpointManifest {
    endpoint?: EndpointInfo | null;
    configuration?: any | null;
    appInfo?: AppInfo | null;
}

export class AppInfo implements IAppInfo {
    hasUpdate?: boolean | null;

    constructor(data?: IAppInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.hasUpdate = data["HasUpdate"] !== undefined ? data["HasUpdate"] : <any>null;
        }
    }

    static fromJS(data: any): AppInfo {
        data = typeof data === 'object' ? data : {};
        let result = new AppInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["HasUpdate"] = this.hasUpdate !== undefined ? this.hasUpdate : <any>null;
        return data; 
    }

    clone(): AppInfo {
        const json = this.toJSON();
        let result = new AppInfo();
        result.init(json);
        return result;
    }
}

export interface IAppInfo {
    hasUpdate?: boolean | null;
}

export enum EndpointAppEventType {
    Common = "Common", 
    ProvisionVersion = "ProvisionVersion", 
    ProvisionDevice = "ProvisionDevice", 
    ProvisionInstallation = "ProvisionInstallation", 
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    throw new SwaggerException(message, status, response, headers, result);
}