import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SystemStatusData, ValueUnitData } from '../dashboard.servicedata';

class UsageColor {
  threshold: number;
  color: string;
}

class UsageColors {
  readonly colors: UsageColor[] = [
    { threshold: 0, color: 'rgba(76, 175, 80, 0.6)' },
    { threshold: 50, color: 'rgba(255, 152, 0, 0.6)' },
    { threshold: 90, color: 'rgba(244, 67, 54, 0.6)' },
  ];

  getColor(usage: number): string {
    let i = this.colors.length - 1;
    while (i > 0) {
      if (usage > this.colors[i].threshold) {
        return this.colors[i].color;
      }
      i--;
    }
    return this.colors[0].color;
  }
}

@Component({
  selector: 'app-dashboard-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnChanges {
  @Input() usageData: SystemStatusData;

  public chartData: any[] = [];
  public chartOptions = {
    maintainAspectRatio: false,
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
  private _usageColors: UsageColors = new UsageColors();

  constructor() {
  }

  getValueString(data: ValueUnitData): string {
    return `${data.value}${data.unit}`;
  }

  getString(data: { used_human: ValueUnitData, total_human: ValueUnitData }): string {
    return `${this.getValueString(data.used_human)} / ${this.getValueString(data.total_human)}`;
  }

  createData(usage: number, label: string, color: string): any {
    return {
      data: [usage],
      label: label,
      backgroundColor: color,
      borderColor: this._usageColors.getColor(usage),
      borderWidth: 4,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usageData']) {
      const newData: SystemStatusData = changes['usageData'].currentValue as SystemStatusData;
      if (newData) {
        const chartData: any[] = [];

        chartData.push(...newData.cpu_usage.map((u: number, i: number) =>
          this.createData(u,
            `CPU ${i + 1}: ${u}%`,
            'rgba(205, 220, 57, 0.6)')
        ));

        chartData.push(...newData.load_average.map((u: number, i: number) =>
          this.createData(100.0 * u / newData.cpu_num,
            `Load ${this._loadLabels[i % this._loadLabels.length]}: ${u}`,
            'rgba(158, 158, 158, 0.6)')
        ));

        const mem_used = +(100.0 * newData.memory_usage.used / newData.memory_usage.total).toFixed(2);
        chartData.push(
          this.createData(mem_used,
            `Memory: ${this.getString(newData.memory_usage)}`,
            'rgba(63, 81, 181, 0.8)')
        );

        const swap_used = +(100.0 * newData.swap_usage.used / newData.swap_usage.total).toFixed(2);
        chartData.push(
          this.createData(swap_used,
            `Swap: ${this.getString(newData.swap_usage)}`,
            'rgba(63, 81, 181, 0.6)')
        );

        for (const du of newData.disk_usage) {
          const disk_used = +(100.0 * du.used / du.total).toFixed(2);
          chartData.push(
            this.createData(disk_used,
              `${du.mountpoint} [ ${du.device} ]: ${this.getString(du)}`,
              'rgba(33, 150, 243, 0.6)')
          );
        }

        this.chartData = chartData;
        this.chartColors = [{ backgroundColor: chartData[0].backgroundColor }];
      } else {
        this.chartData = [];
      }
    }
  }
}
