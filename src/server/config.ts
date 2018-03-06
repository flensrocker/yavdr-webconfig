export class Config {
    private static _config: Config;
    public static get config(): Config {
        return Config._config;
    }
    public static get root(): string {
        return Config._config.root;
    }
    public static get authSecret(): string {
        return Config._config.authSecret;
    }
    public static get authCookieName(): string {
        return Config._config.authCookieName;
    }
    public static get authMaxAgeSec(): number {
        return Config._config.authMaxAgeSec;
    }

    constructor(
        public readonly root: string,
        public readonly authSecret: string,
        public readonly authCookieName: string,
        public readonly authMaxAgeSec: number,
    ) {
        if (Config._config) {
            throw new Error('Config can only be instantiated once!');
        }
        Config._config = this;
    }
}
