import { Component, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { ErrorData, SpinnerData } from '../tools';
import { SystemData, DashboardService } from './dashboard.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnDestroy {
  private _reload = new Subject<boolean>();

  public error = new ErrorData();
  public spinner = new SpinnerData();
  public systemData: Observable<SystemData>;

  constructor(private _service: DashboardService) {
    this.systemData = this._reload
      .startWith(true)
      .switchMap((reload: boolean) => {
        this.spinner.inc();
        return this._service
          .getSystemData()
          .catch((err: any) => {
            this.error.addError(err);
            return Observable.of<SystemData>(undefined);
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
