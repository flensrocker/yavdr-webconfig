import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { CpuData } from '../dashboard.servicedata';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnChanges {
  @Input() cpuData: CpuData;

  public chartData: any[] = [];
  public chartOptions = {
    legend: {
      display: false,
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
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      }]
    }
  };
  public chartLabels: string[] = [];
  private _chartColors: Array<any> = [{
    backgroundColor: 'rgba(80, 80, 80, 0.6)'
  }, {
    backgroundColor: 'rgba(120, 120, 120, 0.6)'
  }];
  public chartColors: any[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cpuData']) {
      const newData: CpuData = changes['cpuData'].currentValue as CpuData;
      if (newData) {
        this.chartData = [{ data: newData.cpu_usage }];
        this.chartLabels = newData.cpu_usage.map((usage: number, index: number) => `CPU ${index + 1}`);
        this.chartColors = newData.cpu_usage.map((usage: number, index: number) => this._chartColors[index % 2]);
      } else {
        this.chartData = [];
      }
    }
  }
}
