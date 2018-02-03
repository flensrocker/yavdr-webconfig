import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  DashboardService,
  SystemStatusResponse,
} from './dashboard.service';

@Injectable()
export class DashboardServiceHttp implements DashboardService {
  constructor(
    private _http: HttpClient,
  ) {
  }

  getSystemStatus(): Observable<SystemStatusResponse> {
    return this._http.get<SystemStatusResponse>('/api/system/status');
  }
}
