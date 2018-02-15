import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthService, AuthState, AuthOptions, ErrorData } from './tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'yaVDR WebConfig';
  public showSidenav: Observable<boolean>;
  public error: ErrorData = new ErrorData();

  private _sidenav: MatSidenav;
  @ViewChild('sidenav') set sidenav(sn: MatSidenav) {
    this._sidenav = sn;
  }

  constructor(
    private _router: Router,
    private _authOptions: AuthOptions,
    private _authService: AuthService,
  ) {
    this.showSidenav = this._authService.authenticated
      .map((authState: AuthState) => (authState === AuthState.LoggedIn));

    this._authService.validate();
  }

  toggleSidenav(): void {
    this._sidenav.toggle();
  }

  logout(): void {
    this._authService.logout()
      .subscribe(() => {
        this._router.navigateByUrl(this._authOptions.loginUrl);
      }, (err: any) => {
        this.error.addError(err);
      });
  }
}
