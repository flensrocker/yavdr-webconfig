import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

import { LoginModalComponent } from '../login-modal/login-modal.component';

import { AuthService, AuthState } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private _modalRef: MatDialogRef<LoginModalComponent> = undefined;

    constructor(
        private _dialog: MatDialog,
        private _authService: AuthService,
    ) {
    }

    private needsLogin(request: HttpRequest<any>, err: any): boolean {
        return (err instanceof HttpErrorResponse) && (err.status === 401);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .catch((err: any) => {
                if (this.needsLogin(request, err)) {
                    if (!this._modalRef) {
                        this._modalRef = this._dialog.open(LoginModalComponent);
                        this._modalRef.afterClosed()
                            .first()
                            .subscribe(() => {
                                this._modalRef = undefined;
                            });
                    }

                    return this._authService.authenticated
                        .first((state: AuthState) => state === AuthState.LoggedIn)
                        .mergeMap(() => next.handle(request));
                }
                return Observable.throw(err);
            });
    }
}
