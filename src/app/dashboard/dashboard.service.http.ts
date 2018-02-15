import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  DashboardService,
  SystemStatusData,
} from './dashboard.service';

@Injectable()
export class DashboardServiceHttp extends DashboardService {
  constructor(
    private _http: HttpClient,
  ) {
    super();
  }

  getSystemStatus(): Observable<SystemStatusData> {
    return this._http.get<SystemStatusData>('/api/system/status');
  }
}
