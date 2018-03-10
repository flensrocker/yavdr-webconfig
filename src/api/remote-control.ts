// available keys
export type KeyName =
    'arrow_back'
    | 'arrow_downward'
    | 'arrow_forward'
    | 'arrow_upward'
    | 'fast_forward'
    | 'fast_rewind'
    | 'fiber_manual_record'
    | 'info'
    | 'keyboard_arrow_down'
    | 'keyboard_arrow_up'
    | 'location_searching'
    | 'Mediacenter'
    | 'menu'
    | 'pause'
    | 'play_arrow'
    | 'power_settings_new'
    | 'skip_next'
    | 'skip_previous'
    | 'stop'
    | 'subdirectory_arrow_left'
    | 'VDR'
    | 'volume_down'
    | 'volume_off'
    | 'volume_up'
    | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

// POST /api/hitkey
export class HitkeyRequest {
    constructor(
        public key: KeyName
    ) {
    }
}

// reponse to POST /api/hitkey
export class HitkeyResponse {
    msg: string;
    key: KeyName;
}

// POST /api/hitkeys
export class HitkeysRequest {
    constructor(
        public keys: KeyName[]
    ) {
    }
}

// reponse to POST /api/hitkeys
export class HitkeysResponse {
    msg: string;
    keys: KeyName[];
}
