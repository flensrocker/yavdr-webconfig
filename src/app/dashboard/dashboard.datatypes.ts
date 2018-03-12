import { ChartDataSets } from 'chart.js';

export interface NumberChartDataSets extends ChartDataSets {
    data: number[];
}

export class ColoredNumberChartDataSets implements NumberChartDataSets {
    data: number[] = [];
    backgroundColor: string[] = [];
}
