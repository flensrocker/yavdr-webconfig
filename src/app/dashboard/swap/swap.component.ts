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
    legend: {
      display: true,
      position: 'bottom',
    }
  };
  public chartColors: any[] = [{
    backgroundColor: ['rgba(200, 0, 0, 0.6)', 'rgba(0, 200, 0, 0.6)']
  }];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['swapData']) {
      const newData: SwapUsageData = changes['swapData'].currentValue as SwapUsageData;
      if (newData) {
        this.chartData = [
          newData.used,
          newData.free,
        ];
        this.chartLabels = [
          `${newData.used_human.value} ${newData.used_human.unit} used`,
          `${newData.free_human.value} ${newData.free_human.unit} free`,
        ];
      } else {
        this.chartData = [];
        this.chartLabels = [];
      }
    }
  }
}
