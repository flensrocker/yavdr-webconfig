import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeUntil';

import { AuthService, AuthState, AuthOptions, ErrorData } from './tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  public title = 'yaVDR WebConfig';
  public openSidenav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showSidenavButton: Observable<boolean>;
  public error: ErrorData = new ErrorData();

  private _showNavButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _destroy: Subject<boolean> = new Subject<boolean>();

  private _sidenav: MatSidenav;
  @ViewChild('sidenav') set sidenav(sn: MatSidenav) {
    this._sidenav = sn;
  }

  constructor(
    private _router: Router,
    private _media: ObservableMedia,
    private _authOptions: AuthOptions,
    private _authService: AuthService,
  ) {
    this._media
      .asObservable()
      .takeUntil(this._destroy)
      .map((change: MediaChange) => this._media.isActive('lt-md'))
      .distinctUntilChanged()
      .subscribe((isSmall: boolean) => {
        this._showNavButton.next(isSmall);
        this.openSidenav.next(!isSmall);
      });

    this.showSidenavButton = this._authService.authenticated
      .map((authState: AuthState) => (authState === AuthState.LoggedIn))
      .combineLatest(this._showNavButton)
      .map(([isLoggedIn, showButton]: [boolean, boolean]) => isLoggedIn && showButton);

    this._authService.validate();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  toggleSidenav(): void {
    this.openSidenav.next(!this.openSidenav.value);
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
