import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SystemStatusData } from '../../api';
export {
  ValueUnitData,
  CpuData,
  LoadData,
  SystemData,
  DiskUsageData,
  MemoryUsageData,
  SwapUsageData,
  TemperatureData,
  FanData,
  SystemStatusData,
} from '../../api';

@Injectable()
export class DashboardService {
  constructor(
    private _http: HttpClient,
  ) {
  }

  getSystemStatus(): Observable<SystemStatusData> {
    return this._http.get<SystemStatusData>('/api/system/status');
  }
}
