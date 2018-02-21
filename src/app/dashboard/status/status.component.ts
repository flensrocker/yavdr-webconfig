import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SystemStatusData, ValueUnitData } from '../dashboard.servicedata';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnChanges {
  @Input() statusData: SystemStatusData;

  public chartData: any[] = [];
  public chartOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        position: 'top',
        ticks: {
          beginAtZero: true,
          min: 0.0,
          max: 100.0,
          callback: (value, index, values) => `${value}%`,
        }
      }],
      yAxes: [{
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      }]
    }
  };
  public chartLabels: string[] = [];
  private _chartColors: string[] = [
    'rgba(200, 0, 0, 0.6)',
    'rgba(200, 200, 0, 0.6)',
    'rgba(0, 200, 0, 0.6)',
  ];
  public chartColors: any[] = [];

  constructor() {
  }

  getColor(usage: number): string {
    let index = (usage > 90) ? 0 : ((usage > 50) ? 1 : 2);
    return this._chartColors[index % this._chartColors.length];
  }

  getString(data: { used_human: { value: string, unit: string }, total_human: { value: string, unit: string } }): string {
    return `(${data.used_human.value}${data.used_human.unit}/${data.total_human.value}${data.total_human.unit})`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statusData']) {
      const newData: SystemStatusData = changes['statusData'].currentValue as SystemStatusData;
      if (newData) {
        let data: number[] = [].concat(newData.cpu_usage);
        let labels: string[] = newData.cpu_usage.map((usage: number, index: number) => `CPU ${index + 1}`);
        let colors: string[] = newData.cpu_usage.map((usage: number, index: number) => this.getColor(usage));
        let usage: number;

        usage = +(100.0 * newData.memory_usage.used / newData.memory_usage.total).toFixed(2);
        data.push(usage);
        labels.push(`Memory ${this.getString(newData.memory_usage)}`);
        colors.push(this.getColor(usage));

        usage = +(100.0 * newData.swap_usage.used / newData.swap_usage.total).toFixed(2);
        data.push(usage);
        labels.push(`Swap ${this.getString(newData.swap_usage)}`);
        colors.push(this.getColor(usage));

        for (let du of newData.disk_usage) {
          usage = +(100.0 * du.used / du.total).toFixed(2);
          data.push(usage);
          labels.push(`${du.device} on ${du.mountpoint} ${this.getString(du)}`);
          colors.push(this.getColor(usage));
        }

        this.chartData = [{ data: data }];
        this.chartLabels = labels;
        this.chartColors = [{ backgroundColor: colors }];
      } else {
        this.chartData = [];
      }
    }
  }
}
