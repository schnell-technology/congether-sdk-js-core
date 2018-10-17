import { CongetherClient } from "./CongetherClient";
export declare class ConductorHandler {
    private client;
    constructor(client: CongetherClient);
    getConfigurationValue<T>(key: string, defaultValue?: T): Promise<T>;
}
