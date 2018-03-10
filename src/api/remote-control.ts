// available keys
export type KeyName =
    string
    | 'KEY_POWER2' // power_settings_new
    | 'KEY_PROG2' // Mediacenter
    | 'KEY_PROG1' // VDR
    | 'KEY_PLAY' // play_arrow
    | 'KEY_PAUSE' // pause
    | 'KEY_STOP' // stop
    | 'KEY_REWIND' // fast_rewind
    | 'KEY_FASTFORWARD' // fast_forward
    | 'KEY_BACK' // skip_previous
    | 'KEY_NEXT' // skip_next
    | 'KEY_RECORD' // fiber_manual_record
    | 'KEY_INFO' // info
    | 'KEY_MENU' // menu
    | 'KEY_UP' // arrow_upward
    | 'KEY_DOWN' // arrow_downward
    | 'KEY_LEFT' // arrow_back
    | 'KEY_RIGHT' // arrow_forward
    | 'KEY_OK' // location_searching
    | 'KEY_ESC' // subdirectory_arrow_left
    | 'KEY_VOLUMEUP' // volume_up
    | 'KEY_VOLUMEDOWN' // volume_down
    | 'KEY_MUTE' // volume_off
    | 'KEY_CHANNELUP' // keyboard_arrow_up
    | 'KEY_CHANNELDOWN' // keyboard_arrow_down
    | 'KEY_RED'
    | 'KEY_GREEN'
    | 'KEY_YELLOW'
    | 'KEY_BLUE'
    | 'KEY_0' // 0
    | 'KEY_1' // 1
    | 'KEY_2' // 2
    | 'KEY_3' // 3
    | 'KEY_4' // 4
    | 'KEY_5' // 5
    | 'KEY_6' // 6
    | 'KEY_7' // 7
    | 'KEY_8' // 8
    | 'KEY_9' // 9
    ;

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
