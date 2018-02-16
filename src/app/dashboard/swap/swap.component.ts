import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SwapUsageData } from '../dashboard.service';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent implements OnChanges {
  @Input() swapData: SwapUsageData;
  public chartData: number[] = [];
  public chartLabels: string[] = [];
  public chartOptions = {
    title: {
      display: true,
      text: 'no swap usage found'
    },
    tooltips: {
      enabled: false
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['swapData']) {
      const newData: SwapUsageData = changes['swapData'].currentValue as SwapUsageData;
      if (newData) {
        this.chartOptions.title.text = `Total swap: ${newData.total_human.value} ${newData.total_human.unit}`;
        this.chartData = [
          newData.used,
          newData.free,
        ];
        this.chartLabels = [
          `${newData.used_human.value} ${newData.used_human.unit} used`,
          `${newData.free_human.value} ${newData.free_human.unit} free`,
        ];
      } else {
        this.chartOptions.title.text = `no swap found`;
        this.chartData = [];
        this.chartLabels = [];
      }
    }
  }
}
