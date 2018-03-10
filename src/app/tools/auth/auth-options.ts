import { Injectable } from '@angular/core';

@Injectable()
export class AuthOptions {
    public loginUrl = '/login';
    public homeUrl = '/home';

    constructor() {
    }
}
