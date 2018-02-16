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
    title: {
      display: true,
      text: 'no memory usage found'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 1
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
        this.chartOptions.title.text = `total memory: ${newData.total_human.value} ${newData.total_human.unit}`
        this.chartOptions.scales.yAxes[0].ticks.suggestedMax = newData.total;
        this.chartData = [{
          label: 'used',
          data: [newData.used]
        }, {
          label: 'cached',
          data: [newData.cached]
        }, {
          label: 'buffers',
          data: [newData.buffers]
        }, {
          label: 'free',
          data: [newData.free]
        }, {
          label: 'available',
          data: [newData.available]
        }, {
          label: 'total',
          data: [newData.total]
        }];
      } else {
        this.chartOptions.title.text = 'no memory usage found';
        this.chartOptions.scales.yAxes[0].ticks.suggestedMax = 1;
        this.chartData = [];
      }
    }
  }
}
