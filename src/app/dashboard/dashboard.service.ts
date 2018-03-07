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

export abstract class DashboardService {
  abstract getSystemStatus(): Observable<SystemStatusData>;
}
