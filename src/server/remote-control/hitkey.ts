import { RouteResponse } from '../tools/route';

import {
    HitkeyRequest,
    HitkeyResponse,
    HitkeysRequest,
    HitkeysResponse,
} from '../../api';

export {
    HitkeyRequest,
    HitkeyResponse,
    HitkeysRequest,
    HitkeysResponse,
};

export namespace RemoteControl {
    export const hitkey = (request: HitkeyRequest): RouteResponse<HitkeyResponse> => {
        console.log('hit key:', request.key);
        return {
            response: {
                msg: 'ok',
                key: request.key,
            },
        };
    };

    export const hitkeys = (request: HitkeysRequest): RouteResponse<HitkeysResponse> => {
        console.log('hit keys:', request.keys.join(','));
        return {
            response: {
                msg: 'ok',
                keys: request.keys,
            },
        };
    };
}
