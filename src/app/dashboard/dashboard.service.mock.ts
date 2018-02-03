import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  DashboardService,
  SystemStatusResponse,
} from './dashboard.service';

@Injectable()
export class DashboardServiceMock implements DashboardService {
  constructor(
    private _http: HttpClient,
  ) {
  }

  getSystemStatus(): Observable<SystemStatusResponse> {
    return Observable.of<SystemStatusResponse>({
      cpu_num: 2,
      cpu_usage: [70.0, 12.5]
    });
  }
}
