import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export class ErrorData {
    private _errors = new BehaviorSubject<string[]>([]);

    public static errorToString(error: any): string {
        let ret: string;

        if ((error !== undefined) && (error !== null)) {
            if (error.json && (typeof error.json === 'function')) {
                error = error.json();
            }

            if (error instanceof Error) {
                ret = error.message;
            } else if (typeof error === 'string') {
                ret = error;
            } else if (error.msg && (typeof error.msg === 'string')) {
                ret = error.msg;
            } else if (error instanceof HttpErrorResponse) {
                let e: any = error.error;
                try {
                    e = JSON.parse(error.error);
                } catch (exception) {
                }
                ret = ErrorData.errorToString(e);
                if (ret === undefined) {
                    ret = error.message;
                }
            } else {
                try {
                    // UEO: unknown error objects...
                    ret = JSON.stringify(error);
                } catch (exception) {
                    // if JSON.stringify throws (recursive objects etc.)
                    ret = 'Unknown error, have a look at the error console';
                    console.error(error);
                }
            }
        }

        return ret;
    }

    constructor() {
    }

    public get errors(): Observable<string[]> {
        return this._errors.asObservable();
    }

    public get hasErrors(): Observable<boolean> {
        return this._errors.asObservable()
            .map((err: string[]) => (err === undefined) || (err.length === 0) ? false : true);
    }

    public addError(error: any): void {
        const msg = ErrorData.errorToString(error);
        if (msg !== undefined) {
            this._errors.next([...this._errors.getValue(), msg]);
        }
    }

    public clearErrors(): void {
        this._errors.next([]);
    }
}
