import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { UsageColors } from '../../tools';
import { FanData } from '../dashboard.service';

class ChartData {
  data: number[] = [];
  backgroundColor: string[] = [];
}

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

  public chartData: ChartData[] = [];
  public chartOptions = {
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
        const chartData: ChartData = new ChartData();

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

        this.chartLabels = chartLabels;
        this.chartData = [chartData];
      } else {
        this.chartLabels = [];
        this.chartData = [];
      }
    }
  }
}
