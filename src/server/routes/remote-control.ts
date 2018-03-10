import { Route, SyncRouteHandler } from '../tools/route';
import { Routing } from '../tools/routing';
import { RemoteControl, HitkeyResponse, HitkeysResponse } from '../remote-control/hitkey';

export const RemoteControlRoutes = Routing.setupRoutes<
    HitkeyResponse | HitkeysResponse
    >([
        new Route<HitkeyResponse>('post', '/hitkey', new SyncRouteHandler(RemoteControl.hitkey), true),
        new Route<HitkeysResponse>('post', '/hitkeys', new SyncRouteHandler(RemoteControl.hitkeys), true),
    ]);
