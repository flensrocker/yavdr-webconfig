import * as crypto from 'crypto';

import { BaseUser, UserManager } from './tools';

export class AppUser implements BaseUser {
    private _hashedPassword: string;

    constructor(
        public username: string,
        password: string,
        public groups: string[]
    ) {
        this._hashedPassword = this.hashPassword(password);
    }

    private hashPassword(password: string): string {
        return crypto.createHash('sha256')
            .update(password)
            .digest('hex');
    }

    checkPassword(password: string): boolean {
        return (this._hashedPassword === this.hashPassword(password));
    }
}

const users: AppUser[] = [
    new AppUser('a', 'a', ['users', 'adm', 'sudo']),
];

export class AppUserManager implements UserManager {
    findUser(username: string): AppUser | null {
        if (username) {
            const user: AppUser = users.find((u) => u.username === username);
            if (user) {
                return user;
            }
        }

        return null;
    }

    authenticateUser(username: string, password: string): AppUser | null {
        if (username) {
            const user: AppUser = this.findUser(username);
            if (user && user.checkPassword(password)) {
                return user;
            }
        }

        return null;
    }
}
