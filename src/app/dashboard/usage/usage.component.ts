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
        const labelIndex = new Set<number>();

        labelIndex.add(chartLabels.length);
        this.pushData(chartLabels, chartData, 'CPU', NaN);
        newData.cpu_usage.forEach((u: number, i: number) => {
          this.pushData(chartLabels, chartData,
            `${i + 1}: ${u}%`,
            u
          );
        });

        labelIndex.add(chartLabels.length);
        this.pushData(chartLabels, chartData, 'Load', NaN);
        newData.load_average.forEach((u: number, i: number) => {
          const load = 100.0 * u / newData.cpu_num;
          this.pushData(chartLabels, chartData,
            `${this._loadLabels[i % this._loadLabels.length]}: ${u}`,
            load
          );
        });

        labelIndex.add(chartLabels.length);
        this.pushData(chartLabels, chartData, 'Memory', NaN);
        const mem_used = +(100.0 * newData.memory_usage.used / newData.memory_usage.total).toFixed(2);
        this.pushData(chartLabels, chartData,
          `RAM: ${this.getString(newData.memory_usage)}`,
          mem_used
        );

        const swap_used = +(100.0 * newData.swap_usage.used / newData.swap_usage.total).toFixed(2);
        this.pushData(chartLabels, chartData,
          `Swap: ${this.getString(newData.swap_usage)}`,
          swap_used
        );

        labelIndex.add(chartLabels.length);
        this.pushData(chartLabels, chartData, 'Disks', NaN);
        for (const du of newData.disk_usage) {
          const disk_used = +(100.0 * du.used / du.total).toFixed(2);
          this.pushData(chartLabels, chartData,
            `${du.mountpoint}: ${this.getString(du)}`,
            disk_used
          );
        }

        const highData: any = {
          label: 'high',
          type: 'line',
          pointStyle: 'line',
          fill: false,
          showLine: false,
          data: chartData.data.map((d: number, i: number) => (labelIndex.has(i) ? NaN : this._usageColors.high)),
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
          data: chartData.data.map((d: number, i: number) => (labelIndex.has(i) ? NaN : this._usageColors.critical)),
          backgroundColor: this._usageColors.criticalColor,
          borderColor: this._usageColors.criticalColor,
          borderWidth: 3,
        };

        // workaround for not refreshing chart
        this.chartLabels = undefined;
        setTimeout(() => {
          this.chartLabels = chartLabels;
          this.chartData = [chartData, highData, criticalData];
          this.chartColors = [{
            backgroundColor: chartData.backgroundColor,
          }];
        }, 1);
      } else {
        this.chartLabels = [];
        this.chartData = [];
        this.chartColors = [];
      }
    }
  }
}
