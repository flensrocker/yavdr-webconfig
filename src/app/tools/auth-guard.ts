import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { AuthService } from './auth.service';
import { AuthState } from './auth.servicedata';
import { AuthOptions } from './auth-options';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _authOptions: AuthOptions,
        private _authService: AuthService,
        private _router: Router,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise<boolean>((resolve) => {
            this._authService.authenticated
                .filter((authState: AuthState) => (authState !== AuthState.NotValidated))
                .first()
                .subscribe((authState: AuthState) => {
                    if (authState === AuthState.LoggedIn) {
                        resolve(true);
                    } else {
                        this._router.navigate([this._authOptions.loginUrl, { returnUrl: state.url } ]);
                        resolve(false);
                    }
                }, (err: any) => {
                    resolve(false);
                });
        });
    }
}
