import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { UsageColors } from '../../tools';
import { TemperatureData } from '../dashboard.service';

class ChartData {
  data: number[] = [];
  backgroundColor: string[] = [];
}

interface InputTemperatureData {
  [key: string]: TemperatureData[];
}

@Component({
  selector: 'app-dashboard-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnChanges {
  @Input() temperatureData: InputTemperatureData;

  public chartData: ChartData[] = [];
  public chartOptions = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
    scales: {
      xAxes: [{
        barPercentage: 1.0,
        categoryPercentage: 0.4,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }],
    }
  };
  public chartLabels: string[] = [];
  public chartColors: any[] = [];

  private _usageColors: UsageColors = new UsageColors();

  pushData(labels: string[], data: ChartData, label: string, usage: number, colors: UsageColors): void {
    labels.push(label);
    data.data.push(usage);
    data.backgroundColor.push(colors.getColor(usage));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['temperatureData']) {
      const newData: InputTemperatureData = changes['temperatureData'].currentValue as InputTemperatureData;
      if (newData) {
        const chartLabels: string[] = [];
        const chartData: ChartData = new ChartData();
        const highData: any = {
          label: 'high',
          type: 'line',
          pointStyle: 'line',
          fill: false,
          showLine: false,
          spanGaps: false,
          data: [],
          backgroundColor: this._usageColors.highColor,
          borderColor: this._usageColors.highColor,
          borderWidth: 3,
        };
        const criticalData: any = {
          label: 'critical',
          type: 'line',
          pointStyle: 'line',
          fill: false,
          showLine: false,
          spanGaps: false,
          data: [],
          backgroundColor: this._usageColors.criticalColor,
          borderColor: this._usageColors.criticalColor,
          borderWidth: 3,
        };

        for (const key of Object.keys(newData)) {
          this.pushData(chartLabels, chartData, key, NaN, this._usageColors);
          highData.data.push(NaN);
          criticalData.data.push(NaN);
          for (const t of newData[key]) {
            const critical = t.critical > 0 ? t.critical : NaN;
            const high = t.high > 0 ? t.high : NaN;
            this.pushData(chartLabels, chartData, t.label, t.current, new UsageColors(high, critical));
            highData.data.push(high);
            criticalData.data.push(critical);
          }
        }

        this.chartLabels = chartLabels;
        this.chartData = [chartData, highData, criticalData];
        this.chartColors = [{
          backgroundColor: chartData.backgroundColor,
        }];
      } else {
        this.chartLabels = [];
        this.chartData = [];
        this.chartColors = [];
      }
    }
  }
}