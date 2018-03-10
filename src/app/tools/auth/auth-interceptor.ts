import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { LoginModalComponent } from '../login-modal/login-modal.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _dialog: MatDialog,
    ) {
    }

    private needsLogin(request: HttpRequest<any>, err: any): boolean {
        return !request.url.startsWith('/api/login')
            && (err instanceof HttpErrorResponse)
            && (err.status === 401);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .catch((err: any) => {
                if (this.needsLogin(request, err)) {
                    return this._dialog.open(LoginModalComponent)
                        .afterClosed()
                        .mergeMap(() => next.handle(request));
                }
                return Observable.throw(err);
            });
    }
}
