import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { ErrorData, SpinnerData } from '../tools';
import { CpuData, DashboardService } from './dashboard.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnDestroy {
  private _reload = new Subject<boolean>();

  public error = new ErrorData();
  public spinner = new SpinnerData();
  public cpuData: Observable<CpuData>;

  constructor(private _service: DashboardService) {
    this.cpuData = this._reload
      .startWith(true)
      .switchMap((reload: boolean) => {
        this.spinner.inc();
        return this._service
          .getCpuData()
          .catch((err: any) => {
            this.error.addError(err);
            return Observable.of<CpuData>(undefined);
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
