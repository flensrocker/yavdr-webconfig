import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { async } from 'rxjs/scheduler/async';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { ValidateResponse, LoginRequest, LoginResponse } from './auth.servicedata';

@Injectable()
export class AuthServiceMock extends AuthService {
  constructor() {
    super();
  }

  validate(): void {
    Observable.of<false>(false)
      .observeOn(async)
      .subscribe((response: false) => {
        this.setLoggedOut(); // force login on every reload
        // this.setLoggedIn('user', ['user']); // auto login
      }, (err: any) => {
        this.setLoggedOut();
      });
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const loginSubject: Subject<LoginResponse> = new Subject<LoginResponse>();
    Observable.of<LoginResponse>(new LoginResponse())
      .observeOn(async)
      .map((response: LoginResponse) => {
        if ((request.username === 'invalid') || (request.password === 'invalid')) {
          throw new Error('invalid username or password');
        }
        response.msg = 'login successfull';
        response.groups = [request.username, 'users', 'adm', 'sudo'];
        return response;
      })
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

  logout(): Observable<true> {
    this.setLoggedOut();
    return Observable.of<true>(true);
  }
}
