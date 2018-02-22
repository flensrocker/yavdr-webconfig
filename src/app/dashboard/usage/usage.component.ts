import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { UsageColors } from '../../tools';
import { SystemStatusData, ValueUnitData } from '../dashboard.servicedata';

class ChartData {
  data: number[] = [];
  backgroundColor: string[] = [];
  borderColor: string[] = [];
  borderWidth: number[] = [];
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
        ticks: {
          beginAtZero: true,
          min: 0.0,
          max: 100.0,
          callback: (value, index, values) => `${value}%`,
        }
      }],
      yAxes: [{
        barPercentage: 0.8,
        categoryPercentage: 1.0,
      }]
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

  pushData(labels: string[], data: ChartData, label: string, usage: number, color: string): void {
    labels.push(label);
    data.data.push(usage);
    data.backgroundColor.push(color);
    data.borderColor.push(this._usageColors.getColor(usage));
    data.borderWidth.push(4);
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
            u,
            'rgba(205, 220, 57, 0.6)'
          );
        });

        newData.load_average.forEach((u: number, i: number) => {
          const load = 100.0 * u / newData.cpu_num;
          this.pushData(chartLabels, chartData,
            `Load ${this._loadLabels[i % this._loadLabels.length]}: ${u}`,
            load,
            'rgba(158, 158, 158, 0.6)'
          );
        });

        const mem_used = +(100.0 * newData.memory_usage.used / newData.memory_usage.total).toFixed(2);
        this.pushData(chartLabels, chartData,
          `Memory: ${this.getString(newData.memory_usage)}`,
          mem_used,
          'rgba(63, 81, 181, 0.8)'
        );

        const swap_used = +(100.0 * newData.swap_usage.used / newData.swap_usage.total).toFixed(2);
        this.pushData(chartLabels, chartData,
          `Swap: ${this.getString(newData.swap_usage)}`,
          swap_used,
          'rgba(63, 81, 181, 0.6)'
        );

        for (const du of newData.disk_usage) {
          const disk_used = +(100.0 * du.used / du.total).toFixed(2);
          this.pushData(chartLabels, chartData,
            `${du.mountpoint} [ ${du.device} ]: ${this.getString(du)}`,
            disk_used,
            'rgba(33, 150, 243, 0.6)'
          );
        }

        this.chartLabels = chartLabels;
        this.chartData = [chartData];
        this.chartColors = [{ backgroundColor: chartData.backgroundColor }];
      } else {
        this.chartLabels = [];
        this.chartData = [];
        this.chartColors = [];
      }
    }
  }
}
