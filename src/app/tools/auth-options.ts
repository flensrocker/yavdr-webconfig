import { Injectable } from "@angular/core";

@Injectable()
export class AuthOptions {
    constructor(
        public readonly loginUrl: string = '/login',
        public readonly homeUrl: string = '/home',
    ) {
    }
}
