import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SystemStatusResponse } from './dashboard.servicedata';
export { SystemStatusResponse };

@Injectable()
export class DashboardService {
  constructor(
    private _http: HttpClient,
  ) {
  }

  getSystemStatus(): Observable<SystemStatusResponse> {
    // return this._http.get<SystemStatusResponse>('/api/system/status');
    return Observable.of<SystemStatusResponse>({
      cpu_num: 2,
      cpu_usage: [70.0, 12.5]
    });
  }
}
