import { Observable } from 'rxjs/Observable';

import { SystemStatusResponse } from './dashboard.servicedata';
export { SystemStatusResponse };

export abstract class DashboardService {
  abstract getSystemStatus(): Observable<SystemStatusResponse>;
}
