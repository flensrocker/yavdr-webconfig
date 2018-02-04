import { Observable } from 'rxjs/Observable';

import { SystemStatusData } from './dashboard.servicedata';
export {
  DiskUsageData,
  MemoryUsageData,
  SwapUsageData,
  TemperatureData,
  SystemStatusData,
} from './dashboard.servicedata';

export abstract class DashboardService {
  abstract getSystemStatus(): Observable<SystemStatusData>;
}
