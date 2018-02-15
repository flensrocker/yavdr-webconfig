import { Observable } from 'rxjs/Observable';

import { SystemStatusData, SystemData, CpuData } from './dashboard.servicedata';
export {
  ValueUnitData,
  CpuData,
  SystemData,
  DiskUsageData,
  MemoryUsageData,
  SwapUsageData,
  TemperatureData,
  FanData,
  SystemStatusData,
} from './dashboard.servicedata';

export abstract class DashboardService {
  abstract getSystemStatus(): Observable<SystemStatusData>;

  getCpuData(): Observable<CpuData> {
    return this.getSystemStatus().map((data: SystemStatusData) => data as CpuData);
  }

  getSystemData(): Observable<SystemData> {
    return this.getSystemStatus().map((data: SystemStatusData) => data as SystemData);
  }
}
