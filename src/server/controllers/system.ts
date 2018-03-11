import { SyncRouteDelegate, RouteResponse } from '../tools';

import { SystemStatusData, statusData } from '../data/system';

export { SystemStatusData };

export namespace SystemController {
    export const status: SyncRouteDelegate<SystemStatusData> =
        (request: any): RouteResponse<SystemStatusData> => {
            statusData.cpu_usage.forEach((u: number, i: number) => statusData.cpu_usage[i] = Math.round(10000 * Math.random()) / 100);
            return {
                response: statusData,
            };
        };
}
