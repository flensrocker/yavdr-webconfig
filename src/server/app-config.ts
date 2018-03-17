import { Token } from 'typedi';

export interface AppConfig {
    readonly root: string;
    readonly port: number;
    readonly apiBaseUrl: string;
    readonly fallbackUrl: string;
}

export const AppConfigToken: Token<AppConfig> = new Token<AppConfig>();
