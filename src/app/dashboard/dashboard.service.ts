import { Observable } from 'rxjs/Observable';

import { SystemStatusData } from './dashboard.servicedata';
export { SystemStatusData };

export abstract class DashboardService {
  abstract getSystemStatus(): Observable<SystemStatusData>;
}
