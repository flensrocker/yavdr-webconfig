import { Injectable } from "@angular/core";

@Injectable()
export class AuthOptions {
    public loginUrl: string = '/login';
    public homeUrl: string = '/home';

    constructor() {
    }
}
