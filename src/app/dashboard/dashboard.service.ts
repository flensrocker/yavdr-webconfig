import { Observable } from 'rxjs/Observable';

import { SystemStatusData } from './dashboard.servicedata';
export {
  ValueUnitData,
  DiskUsageData,
  MemoryUsageData,
  SwapUsageData,
  TemperatureData,
  FanData,
  SystemStatusData,
} from './dashboard.servicedata';

export abstract class DashboardService {
  abstract getSystemStatus(): Observable<SystemStatusData>;
}
