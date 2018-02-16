import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { CpuData } from '../dashboard.servicedata';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent {
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

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cpuData']) {
      const newData: CpuData = changes['cpuData'].currentValue as CpuData;
      if (newData) {
        this.chartData = newData.cpu_usage.map((usage: number, index: number) => { return { data: [usage], label: `CPU ${index + 1}` }; });
      } else {
        this.chartData = [];
      }
    }
  }
}
