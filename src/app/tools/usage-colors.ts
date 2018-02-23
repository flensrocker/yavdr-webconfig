export class UsageColors {
    private _critical: number = 75;
    private _high: number = 90;
    private _defaultColor: string = 'rgba(76, 175, 80, 0.6)';
    private _criticalColor: string = 'rgba(255, 152, 0, 0.6)';
    private _highColor: string = 'rgba(244, 67, 54, 0.6)';

    constructor(critical?: number, high?: number, defaultColor?: string, criticalColor?: string, highColor?: string,
    ) {
        if (critical && (critical > 0)) {
            this._critical = critical;
        }
        if (high && (high > this._critical)) {
            this._high = high;
        }
        if (defaultColor) {
            this._defaultColor = defaultColor;
        }
        if (criticalColor) {
            this._criticalColor = criticalColor;
        }
        if (highColor) {
            this._highColor = highColor;
        }
    }

    get critical(): number {
        return this._critical;
    }

    get high(): number {
        return this._high;
    }

    get criticalColor(): string {
        return this._criticalColor;
    }

    get highColor(): string {
        return this._highColor;
    }

    get defaultColor(): string {
        return this._defaultColor;
    }

    getColor(usage: number): string {
        if (usage >= this._high) {
            return this._highColor;
        }
        if (usage >= this._critical) {
            return this._criticalColor;
        }
        return this._defaultColor;
    }
}
