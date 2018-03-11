export class AuthConfig {
    private static _config: AuthConfig;
    public static get config(): AuthConfig {
        if (!AuthConfig._config) {
            throw new Error('AuthConfig must be setup on app initialization!');
        }
        return AuthConfig._config;
    }
    public static get secret(): string {
        return AuthConfig.config.secret;
    }
    public static get cookieName(): string {
        return AuthConfig.config.cookieName;
    }
    public static get maxAgeSec(): number {
        return AuthConfig.config.maxAgeSec;
    }

    constructor(
        public readonly secret: string,
        public readonly cookieName: string,
        public readonly maxAgeSec: number,
    ) {
        if (AuthConfig._config) {
            throw new Error('AuthConfig can only be instantiated once!');
        }
        AuthConfig._config = this;
    }
}
