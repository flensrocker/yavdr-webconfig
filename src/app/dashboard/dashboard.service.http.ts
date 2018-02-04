import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  DashboardService,
  SystemStatusData,
} from './dashboard.service';

@Injectable()
export class DashboardServiceHttp implements DashboardService {
  constructor(
    private _http: HttpClient,
  ) {
  }

  getSystemStatus(): Observable<SystemStatusData> {
    return this._http.get<SystemStatusData>('/api/system/status');
  }
}
