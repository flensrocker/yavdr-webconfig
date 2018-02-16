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
    tooltips: {
      enabled: false
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['swapData']) {
      const newData: SwapUsageData = changes['swapData'].currentValue as SwapUsageData;
      this.chartData = [
        newData.used,
        newData.free
      ];
      this.chartLabels = [
        newData.used_human.value + ' ' + newData.used_human.unit + ' used',
        newData.free_human.value + ' ' + newData.free_human.unit + ' free'
      ];
    }
  }
}
