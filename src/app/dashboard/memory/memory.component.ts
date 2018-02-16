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
    scales: {
      xAxes: [{
        barPercentage: 0.5,
        ticks: {
          min: 0,
          max: 1
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
        this.chartOptions.scales.xAxes[0].ticks.max = newData.total;
        this.chartData = [{
          data: [newData.used],
          label: `${newData.used_human.value} ${newData.used_human.unit} used`
        }, {
          data: [newData.cached],
          label: `${newData.cached_human.value} ${newData.cached_human.unit} cached`
        }, {
          data: [newData.buffers],
          label: `${newData.buffers_human.value} ${newData.buffers_human.unit} buffers`
        }, {
          data: [newData.available],
          label: `${newData.available_human.value} ${newData.available_human.unit} available`
        }];
      } else {
        this.chartData = [];
      }
    }
  }
}
