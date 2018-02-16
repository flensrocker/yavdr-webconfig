import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { CpuData } from '../dashboard.servicedata';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent {
  @Input() cpuData: CpuData;

  public cpuChartData: any[] = [];
  public cpuChartOptions = {
    title: {
      display: true,
      text: 'no CPU usage found'
    },
    scales: {
      xAxes: [{
        barPercentage: 0.5,
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 100.0
        }
      }]
    }
  };

  private readonly _loadLabels: string[] = ['1 min', '5 min', '15 min'];
  public loadChartData: any[] = [];
  public loadChartOptions = {
    title: {
      display: true,
      text: 'no load found'
    },
    ticks: {
      beginAtZero: true,
      suggestedMax: 1.0
    },
    scales: {
      xAxes: [{
        barPercentage: 0.5,
      }]
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cpuData']) {
      const newData: CpuData = changes['cpuData'].currentValue as CpuData;
      if (newData) {
        this.cpuChartOptions.title.text = 'CPU usage';
        this.cpuChartData = newData.cpu_usage.map((usage: number, index: number) => { return { data: [usage], label: `CPU ${index + 1}` }; });
        this.loadChartOptions.title.text = 'Load';
        this.loadChartOptions.ticks.suggestedMax = newData.cpu_num;
        this.loadChartData = newData.load_average.map((load: number, index: number) => {
          return {
            data: [load],
            label: (index < this._loadLabels.length ? this._loadLabels[index] : '')
          };
        });
      } else {
        this.cpuChartOptions.title.text = 'no CPU usage found';
        this.cpuChartData = [];
        this.loadChartOptions.title.text = 'no load found';
        this.loadChartData = [];
      }
    }
  }
}
