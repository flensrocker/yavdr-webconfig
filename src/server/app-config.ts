export class AppConfig {
    private static _config: AppConfig;
    public static get config(): AppConfig {
        if (!AppConfig._config) {
            throw new Error('AppConfig must be setup on app initialization!');
        }
        return AppConfig._config;
    }
    public static get root(): string {
        return AppConfig.config.root;
    }
    public static get port(): number {
        return AppConfig.config.port;
    }
    public static get apiBaseUrl(): string {
        return AppConfig.config.apiBaseUrl;
    }
    public static get fallbackUrl(): string {
        return AppConfig.config.fallbackUrl;
    }

    constructor(
        public readonly root: string,
        public readonly port: number = 4200,
        public readonly apiBaseUrl: string = '/api',
        public readonly fallbackUrl: string = 'index.html',
    ) {
        if (AppConfig._config) {
            throw new Error('AppConfig can only be instantiated once!');
        }
        AppConfig._config = this;
    }
}
