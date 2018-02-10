import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableEvent } from '@angular/service-worker/src/low_level';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { interval } from 'rxjs/observable/interval';

export { UpdateAvailableEvent };

@Injectable()
export class UpdateService {
  private _version: ReplaySubject<UpdateAvailableEvent> = new ReplaySubject<UpdateAvailableEvent>(1);
  public version: Observable<UpdateAvailableEvent> = this._version.asObservable();

  constructor(private _swUpdate: SwUpdate) {
    _swUpdate.available.subscribe((e: UpdateAvailableEvent) => this._version.next(e));
    interval(60 * 1000).subscribe(() => _swUpdate.checkForUpdate());
  }

  public checkForUpdate(): void {
    this._swUpdate.checkForUpdate();
  }

  public update(): void {
    document.location.reload();
  }
}
