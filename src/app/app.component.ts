import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { async } from 'rxjs/scheduler/async';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/takeUntil';

import { AuthService, AuthState, AuthOptions, ErrorData } from './tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public title = 'yaVDR WebConfig';
  public isLoggedIn: ConnectableObservable<boolean>;
  public openSidenav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public error: ErrorData = new ErrorData();

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
    this.isLoggedIn = this._authService.authenticated
      .observeOn(async)
      .map((authState: AuthState) => (authState === AuthState.LoggedIn))
      .publish();

    this._media
      .asObservable()
      .takeUntil(this._destroy)
      .map((change: MediaChange) => this._media.isActive('gt-sm'))
      .distinctUntilChanged()
      .subscribe((gettingLarge: boolean) => {
        this.openSidenav.next(gettingLarge);
      });

    this._authService.validate();
  }

  ngAfterViewInit(): void {
    this.isLoggedIn.connect();
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
        this._router.navigateByUrl(this._authOptions.homeUrl);
      }, (err: any) => {
        this.error.addError(err);
      });
  }
}
