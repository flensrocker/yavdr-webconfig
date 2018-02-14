import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';
import { ValidateResponse, LoginRequest, LoginResponse } from './auth.servicedata';

@Injectable()
export class AuthServiceHttp extends AuthService {
  constructor(private _http: HttpClient) {
    super();
  }

  validate(): void {
    this._http.get<ValidateResponse>('/api/login')
      .subscribe((response: ValidateResponse) => {
        this.setLoggedIn(response.username, response.groups);
      }, (err: any) => {
        this.setLoggedOut();
      });
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    let loginSubject: Subject<LoginResponse> = new Subject<LoginResponse>();
    this._http.post<LoginResponse>('/api/login', request)
      .subscribe((response: LoginResponse) => {
        this.setLoggedIn(request.username, response.groups);
        loginSubject.next(response);
      }, (err: any) => {
        this.setLoggedOut();
        loginSubject.error(err);
      }, () => {
        loginSubject.complete();
      });
    return loginSubject.asObservable();
  }

  logout(): void {
    this.setLoggedOut();
    this._http.post('/api/logout', {}).subscribe(() => { });
  }
}
