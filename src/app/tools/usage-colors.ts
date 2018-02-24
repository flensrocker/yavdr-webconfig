export class UsageColors {
    private _high = 75;
    private _critical = 90;
    private _defaultColor = 'rgba(76, 175, 80, 0.6)';
    private _highColor = 'rgba(255, 152, 0, 0.6)';
    private _criticalColor = 'rgba(244, 67, 54, 0.6)';

    constructor(high?: number, critical?: number, defaultColor?: string, highColor?: string, criticalColor?: string,
    ) {
        if (high && (high > this._critical)) {
            this._high = high;
        }
        if (critical && (critical > 0)) {
            this._critical = critical;
        }
        if (defaultColor) {
            this._defaultColor = defaultColor;
        }
        if (highColor) {
            this._highColor = highColor;
        }
        if (criticalColor) {
            this._criticalColor = criticalColor;
        }
    }

    get high(): number {
        return this._high;
    }

    get critical(): number {
        return this._critical;
    }

    get highColor(): string {
        return this._highColor;
    }

    get criticalColor(): string {
        return this._criticalColor;
    }

    get defaultColor(): string {
        return this._defaultColor;
    }

    getColor(usage: number): string {
        if (usage >= this._critical) {
            return this._criticalColor;
        }
        if (usage >= this._high) {
            return this._highColor;
        }
        return this._defaultColor;
    }
}
