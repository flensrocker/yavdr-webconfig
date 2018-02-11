import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableEvent } from '@angular/service-worker/src/low_level';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { interval } from 'rxjs/observable/interval';
import { UpdateData } from './update.servicedata';

export { UpdateData };

@Injectable()
export class UpdateService {
  private _available: ReplaySubject<UpdateData> = new ReplaySubject<UpdateData>(1);
  public get available(): Observable<UpdateData> {
    return this._available.asObservable();
  }

  constructor(private _swUpdate: SwUpdate) {
    _swUpdate.available.subscribe((e: UpdateAvailableEvent) => {
      this._available.next(new UpdateData(e.current.hash, e.available.hash));
    });
    interval(60 * 1000).subscribe(() => this.checkForUpdate());
  }

  public checkForUpdate(): void {
    this._swUpdate.checkForUpdate();
  }

  public updateApp(): void {
    this._swUpdate
      .activateUpdate()
      .then(() => document.location.href = '/');
    // .then(() => document.location.reload()); // needs HTML5 pushstate http-server
  }
}
