export class AppConfig {
    private static _config: AppConfig;
    public static get config(): AppConfig {
        if (!AppConfig._config) {
            throw new Error('Config must be setup on app initialization!');
        }
        return AppConfig._config;
    }
    public static get root(): string {
        return AppConfig.config.root;
    }

    constructor(
        public readonly root: string,
    ) {
        if (AppConfig._config) {
            throw new Error('Config can only be instantiated once!');
        }
        AppConfig._config = this;
    }
}
