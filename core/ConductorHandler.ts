import { CongetherClient } from "./CongetherClient";

export class ConductorHandler {
    constructor(private client: CongetherClient) {
        
    }

    public async getConfigurationValue<T>(key: string, defaultValue?: T): Promise<T> {
        var manifest = await this.client.getManifest();
        var returnValue = null;
        if (manifest != null && manifest.configuration != null) {
            returnValue = manifest.configuration[key];
        }
        if (returnValue == null || returnValue == undefined)
            returnValue = defaultValue;

        return returnValue;
    }
}