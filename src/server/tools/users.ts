import { Token } from 'typedi';

export interface BaseUser {
    readonly username: string;
    readonly groups: string[];
}

export interface UserManager {
    authenticateUser(username: string, password: string): BaseUser | null;
    findUser(username: string): BaseUser | null;
}

export const UserManagerToken: Token<UserManager> = new Token<UserManager>();
