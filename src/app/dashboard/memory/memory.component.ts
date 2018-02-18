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
      display: true,
      position: 'bottom',
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
          min: 0.0,
          max: 100.0,
          callback: (value, index, values) => `${value}%`
        }
      }],
      yAxes: [{
        barPercentage: 0.5,
        categoryPercentage: 1.0,
        stacked: true
      }]
    }
  };
  public chartColors: any[] = [{
    backgroundColor: 'rgba(200, 0, 0, 0.6)',
  }, {
    backgroundColor: 'rgba(48, 48, 255, 0.8)',
  }, {
    backgroundColor: 'rgba(200, 200, 0, 0.6)',
  }];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['memoryData']) {
      const newData: MemoryUsageData = changes['memoryData'].currentValue as MemoryUsageData;
      if (newData) {
        this.chartData = [{
          data: [100.0 * newData.used / newData.total],
          label: `${newData.used_human.value} ${newData.used_human.unit} used`
        }, {
          data: [100.0 * newData.buffers / newData.total],
          label: `${newData.buffers_human.value} ${newData.buffers_human.unit} buffers`
        }, {
          data: [100.0 * newData.cached / newData.total],
          label: `${newData.cached_human.value} ${newData.cached_human.unit} cached`
        }];
      } else {
        this.chartData = [];
      }
    }
  }
}
