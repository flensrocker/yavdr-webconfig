import { Token } from 'typedi';

export interface AuthConfig {
    readonly secret: string;
    readonly cookieName: string;
    readonly maxAgeSec: number;
}

export const AuthConfigToken: Token<AuthConfig> = new Token<AuthConfig>();
