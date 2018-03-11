import { SyncRoute } from '../tools/route-sync';
import { Routing } from '../tools/routing';
import { RemoteControl, HitkeyResponse, HitkeysResponse } from '../remote-control/hitkey';

export const RemoteControlRoutes = Routing.setupRoutes([
        new SyncRoute<HitkeyResponse>('post', '/hitkey', RemoteControl.hitkey, true),
        new SyncRoute<HitkeysResponse>('post', '/hitkeys', RemoteControl.hitkeys, true),
    ]);
