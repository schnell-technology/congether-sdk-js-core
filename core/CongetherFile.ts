export class CongetherFile {
    public instanceId: string;
    public privacy_mode: string;
    public privacy_policyAccepted: Date;

    public constructor() {
        this.privacy_mode = CongetherPrivacyMode.PSEUDONYMISATION;
    }
}

export class CongetherPrivacyMode {
    public static readonly ACCEPTED: string = null;
    public static readonly PSEUDONYMISATION: string = "congether.privacy.pseudonymisation";
    public static readonly ANONYMISATION: string = "congether.privacy.anonymisation";
}