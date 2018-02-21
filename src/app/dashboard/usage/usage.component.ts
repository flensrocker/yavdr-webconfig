import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SystemStatusData, ValueUnitData } from '../dashboard.servicedata';

@Component({
  selector: 'app-dashboard-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnChanges {
  @Input() usageData: SystemStatusData;

  public chartData: any[] = [];
  public chartOptions = {
    legend: {
      display: true,
      position: 'right',
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
  public chartLabels: string[] = [''];
  public chartColors: any[] = [];

  private _loadLabels: string[] = ['1 min', '5 min', '15 min'];
  private _usageColors: string[] = [
    'rgba(244, 67, 54, 0.6)',
    'rgba(255, 152, 0, 0.6)',
    'rgba(76, 175, 80, 0.6)',
  ];

  constructor() {
  }

  getColor(usage: number): string {
    const index = (usage >= 90) ? 0 : ((usage >= 50) ? 1 : 2);
    return this._usageColors[index % this._usageColors.length];
  }

  getValueString(data: ValueUnitData): string {
    return `${data.value}${data.unit}`;
  }

  getString(data: { used_human: ValueUnitData, total_human: ValueUnitData }): string {
    return `${this.getValueString(data.used_human)} / ${this.getValueString(data.total_human)}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usageData']) {
      const newData: SystemStatusData = changes['usageData'].currentValue as SystemStatusData;
      if (newData) {
        const chartData: any[] = [];

        chartData.push(...newData.cpu_usage.map((u: number, i: number) => ({
          data: [u],
          label: `CPU ${i + 1}: ${u}%`,
          backgroundColor: 'rgba(205, 220, 57, 0.6)',
          borderColor: this.getColor(u),
          borderWidth: 4,
        })));

        chartData.push(...newData.load_average.map((u: number, i: number) => ({
          data: [100.0 * u / newData.cpu_num],
          label: `Load ${this._loadLabels[i % this._loadLabels.length]}: ${u}`,
          backgroundColor: 'rgba(158, 158, 158, 0.6)',
          borderColor: this.getColor(100.0 * u / newData.cpu_num),
          borderWidth: 4,
        })));

        const mem_used = +(100.0 * newData.memory_usage.used / newData.memory_usage.total).toFixed(2);
        chartData.push({
          data: [mem_used],
          label: `Memory: ${this.getString(newData.memory_usage)}`,
          backgroundColor: 'rgba(63, 81, 181, 0.8)',
          borderColor: this.getColor(mem_used),
          borderWidth: 4,
        });

        const swap_used = +(100.0 * newData.swap_usage.used / newData.swap_usage.total).toFixed(2);
        chartData.push({
          data: [swap_used],
          label: `Swap: ${this.getString(newData.swap_usage)}`,
          backgroundColor: 'rgba(63, 81, 181, 0.6)',
          borderColor: this.getColor(swap_used),
          borderWidth: 4,
        });

        for (const du of newData.disk_usage) {
          const disk_used = +(100.0 * du.used / du.total).toFixed(2);
          chartData.push({
            data: [disk_used],
            label: `${du.mountpoint} [ ${du.device} ]: ${this.getString(du)}`,
            backgroundColor: 'rgba(33, 150, 243, 0.6)',
            borderColor: this.getColor(disk_used),
            borderWidth: 4,
          });
        }

        this.chartData = chartData;
        this.chartColors = [{ backgroundColor: chartData[0].backgroundColor }];
      } else {
        this.chartData = [];
      }
    }
  }
}
