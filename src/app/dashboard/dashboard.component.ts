import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import {
  ErrorData,
  SpinnerData,
} from '../tools';

import {
  DashboardService,
  SystemStatusData,
} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  private _reload = new Subject<boolean>();

  public Error = new ErrorData();
  public Spinner = new SpinnerData();
  public SystemStatus: Observable<SystemStatusData>;

  constructor(
    private _service: DashboardService,
  ) {
    this.SystemStatus = this._reload
      .startWith(true)
      .switchMap((reload: boolean) => {
        this.Spinner.Inc();
        return this._service
          .getSystemStatus()
          .catch((err: any) => {
            this.Error.addError(err);
            return Observable.of<SystemStatusData>(new SystemStatusData());
          })
          .finally(() => {
            this.Spinner.Dec();
          });
      });
  }

  ngOnDestroy(): void {
    this._reload.complete();
    this.Spinner.Destroy();
  }

  reload(): void {
    this._reload.next(true);
  }
}
