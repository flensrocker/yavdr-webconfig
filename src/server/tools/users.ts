import * as crypto from 'crypto';

export class User {
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

const users: User[] = [
    new User('a', 'a', ['users', 'adm', 'sudo']),
];


export namespace Users {
    export const findUser = (username: string): User | null => {
        if (username) {
            const user: User = users.find((u) => u.username === username);
            if (user) {
                return user;
            }
        }

        return null;
    };

    export const authenticateUser = (username: string, password: string): User | null => {
        if (username) {
            const user: User = findUser(username);
            if (user && user.checkPassword(password)) {
                return user;
            }
        }

        return null;
    };
}
