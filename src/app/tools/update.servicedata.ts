export interface AppData {
    version: string;
}

export class UpdateAppData {
    constructor(
        public current: AppData,
        public available: AppData,
    ) {
    }
}
