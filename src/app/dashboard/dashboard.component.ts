import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switch';

import {
  DashboardService,
  SystemStatusData,
} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _reload: Subject<boolean> = new Subject<boolean>();

  public SystemStatus: Observable<SystemStatusData>;

  constructor(
    private _service: DashboardService,
  ) {
    this.SystemStatus = this._reload
      .startWith(true)
      .map((reload: boolean) => {
        // TODO activate spinner
        console.log('dashboard reloading');
        return this._service
          .getSystemStatus()
          .catch((err: any) => {
            // TODO display error
            console.error('dashboard reload error:', err);
            return Observable.of<SystemStatusData>(new SystemStatusData());
          })
          .finally(() => {
            // TODO deactivate spinner
            console.log('dashboard reloaded');
          });
      })
      .switch();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._reload.complete();
  }

  reload(): void {
    this._reload.next(true);
  }
}
