import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';

import { UsageColors } from '../../tools';
import { NumberChartDataSets } from '../dashboard.datatypes';
import { FanData } from '../dashboard.service';

interface InputFanData {
  [key: string]: FanData[];
}

@Component({
  selector: 'app-dashboard-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnChanges {
  @Input() fanData: InputFanData;

  public chartData: ChartDataSets[] = [];
  public chartOptions: ChartOptions = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };
  public chartLabels: string[] = [];

  private _usageColors: UsageColors = new UsageColors();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fanData']) {
      const newData: InputFanData = changes['fanData'].currentValue as InputFanData;
      if (newData) {
        const chartLabels: string[] = [];
        const chartData: NumberChartDataSets = { data: [] };

        for (const key of Object.keys(newData)) {
          for (const f of newData[key]) {
            if (f.label) {
              chartLabels.push(`${key} - ${f.label}`);
            } else {
              chartLabels.push(key);
            }
            chartData.data.push(f.current);
          }
        }

        // workaround for not refreshing chart
        this.chartLabels = undefined;
        setTimeout(() => {
          this.chartLabels = chartLabels;
          this.chartData = [chartData];
        }, 1);
      } else {
        this.chartLabels = [];
        this.chartData = [];
      }
    }
  }
}
