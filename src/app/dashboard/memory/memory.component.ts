import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MemoryUsageData } from '../dashboard.servicedata';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnChanges {
  @Input() memoryData: MemoryUsageData;

  public chartData: any[] = [];
  public chartOptions = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        barPercentage: 0.5
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['memoryData']) {
      const newData: MemoryUsageData = changes['memoryData'].currentValue as MemoryUsageData;
      if (newData) {
        this.chartData = [{
          data: [newData.used],
          label: 'used'
        }, {
          data: [newData.cached],
          label: 'cached'
        }, {
          data: [newData.buffers],
          label: 'buffers'
        }, {
          data: [newData.free],
          label: 'free'
        }, {
          data: [newData.available],
          label: 'available'
        }, {
          data: [newData.total],
          label: 'total'
        }];
      } else {
        this.chartData = [];
      }
    }
  }
}
