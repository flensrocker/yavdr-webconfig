import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { UsageColors } from '../../tools';
import { SystemStatusData, ValueUnitData } from '../dashboard.servicedata';

class ChartData {
  data: number[] = [];
  backgroundColor: string[] = [];
}

@Component({
  selector: 'app-dashboard-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnChanges {
  @Input() usageData: SystemStatusData;

  public chartData: ChartData[] = [];
  public chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [{
        barPercentage: 0.8,
        categoryPercentage: 1.0,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0.0,
          max: 100.0,
          callback: (value, index, values) => `${value}%`,
        }
      }],
    }
  };
  public chartLabels: string[] = [];
  public chartColors: any[] = [];

  private _loadLabels: string[] = ['1 min', '5 min', '15 min'];
  private _usageColors: UsageColors = new UsageColors();

  constructor() {
  }

  getValueString(data: ValueUnitData): string {
    return `${data.value}${data.unit}`;
  }

  getString(data: { used_human: ValueUnitData, total_human: ValueUnitData }): string {
    return `${this.getValueString(data.used_human)} / ${this.getValueString(data.total_human)}`;
  }

  pushData(labels: string[], data: ChartData, label: string, usage: number): void {
    labels.push(label);
    data.data.push(usage);
    data.backgroundColor.push(this._usageColors.getColor(usage));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usageData']) {
      const newData: SystemStatusData = changes['usageData'].currentValue as SystemStatusData;
      if (newData) {
        const chartLabels: string[] = [];
        const chartData: ChartData = new ChartData();

        newData.cpu_usage.forEach((u: number, i: number) => {
          this.pushData(chartLabels, chartData,
            `CPU ${i + 1}: ${u}%`,
            u
          );
        });

        newData.load_average.forEach((u: number, i: number) => {
          const load = 100.0 * u / newData.cpu_num;
          this.pushData(chartLabels, chartData,
            `Load ${this._loadLabels[i % this._loadLabels.length]}: ${u}`,
            load
          );
        });

        const mem_used = +(100.0 * newData.memory_usage.used / newData.memory_usage.total).toFixed(2);
        this.pushData(chartLabels, chartData,
          `Memory: ${this.getString(newData.memory_usage)}`,
          mem_used
        );

        const swap_used = +(100.0 * newData.swap_usage.used / newData.swap_usage.total).toFixed(2);
        this.pushData(chartLabels, chartData,
          `Swap: ${this.getString(newData.swap_usage)}`,
          swap_used
        );

        for (const du of newData.disk_usage) {
          const disk_used = +(100.0 * du.used / du.total).toFixed(2);
          this.pushData(chartLabels, chartData,
            `${du.mountpoint} [ ${du.device} ]: ${this.getString(du)}`,
            disk_used
          );
        }

        const criticalData: any = {
          label: 'critical',
          type: 'line',
          pointStyle: 'line',
          fill: false,
          data: chartData.data.map((d: number) => this._usageColors.critical),
          backgroundColor: this._usageColors.criticalColor,
          borderColor: this._usageColors.criticalColor,
          borderWidth: 2,
        };

        const highData: any = {
          label: 'high',
          type: 'line',
          pointStyle: 'line',
          fill: false,
          data: chartData.data.map((d: number) => this._usageColors.high),
          backgroundColor: this._usageColors.highColor,
          borderColor: this._usageColors.highColor,
          borderWidth: 2,
        };

        this.chartLabels = chartLabels;
        this.chartData = [chartData, criticalData, highData];
        this.chartColors = [{
          backgroundColor: chartData.backgroundColor,
          borderColor: chartData.borderColor,
          borderWidth: chartData.borderWidth,
        }];
      } else {
        this.chartLabels = [];
        this.chartData = [];
        this.chartColors = [];
      }
    }
  }
}
