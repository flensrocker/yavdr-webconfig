import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  private _reload = new Subject<boolean>();

  public error = new ErrorData();
  public spinner = new SpinnerData();
  public systemStatus: Observable<SystemStatusData>;

  constructor(
    private _service: DashboardService,
  ) {
    this.systemStatus = this._reload
      .startWith(true)
      .switchMap((reload: boolean) => {
        this.spinner.inc();
        return this._service
          .getSystemStatus()
          .catch((err: any) => {
            this.error.addError(err);
            return Observable.of<SystemStatusData>(new SystemStatusData());
          })
          .finally(() => {
            this.spinner.dec();
          });
      });
  }

  ngOnDestroy(): void {
    this._reload.complete();
    this.spinner.destroy();
  }

  reload(): void {
    this._reload.next(true);
  }
}
