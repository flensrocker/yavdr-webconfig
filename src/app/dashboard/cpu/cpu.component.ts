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
      display: true,
      position: 'bottom',
    },
    scales: {
      xAxes: [{
        barPercentage: 0.5
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 100.0
        }
      }]
    }
  };
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
        this.chartData = newData.cpu_usage.map((usage: number, index: number) => ({ data: [usage], label: `CPU ${index + 1}` }));
        this.chartColors.length = newData.cpu_num;
        for (let i = 0; i < newData.cpu_num; i++) {
          this.chartColors[i] = this._chartColors[i % 2];
        }
      } else {
        this.chartData = [];
      }
    }
  }
}
