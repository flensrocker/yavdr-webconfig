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
    title: {
      display: true,
      text: 'CPU Usage'
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
      this.chartData = newData.cpu_usage.map((usage: number, index: number) => { return { data: [usage], label: `CPU ${index + 1}` }; });
    }
  }
}
