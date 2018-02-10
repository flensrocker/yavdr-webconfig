import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableEvent } from '@angular/service-worker/src/low_level';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { UpdateAppData, AppData } from './update.servicedata';

export { UpdateAppData, AppData };

@Injectable()
export class UpdateService {
  private _available: ReplaySubject<UpdateAppData> = new ReplaySubject<UpdateAppData>(1);
  public available: Observable<UpdateAppData> = this._available.asObservable();

  constructor(private _swUpdate: SwUpdate) {
    _swUpdate.available.subscribe((e: UpdateAvailableEvent) => {
      this._available.next(new UpdateAppData(e.current.appData as AppData, e.available.appData as AppData));
    });
    setTimeout(() => _swUpdate.checkForUpdate(), 60 * 1000);
  }

  public updateApp(): void {
    this._swUpdate
      .activateUpdate()
      .then(() => document.location.href = '/');
      // .then(() => document.location.reload()); // needs HTML5 pushstate http-server
  }
}
