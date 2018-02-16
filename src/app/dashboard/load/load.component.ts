import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { LoadData } from '../dashboard.servicedata';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent {
  @Input() loadData: LoadData;

  private readonly _loadLabels: string[] = ['1 min', '5 min', '15 min'];
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
          beginAtZero: true
        }
      }]
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loadData']) {
      const newData: LoadData = changes['loadData'].currentValue as LoadData;
      if (newData) {
        this.chartData = newData.load_average.map((load: number, index: number) => {
          return {
            data: [load],
            label: (index < this._loadLabels.length ? this._loadLabels[index] : '')
          };
        });
      } else {
        this.chartData = [];
      }
    }
  }
}
