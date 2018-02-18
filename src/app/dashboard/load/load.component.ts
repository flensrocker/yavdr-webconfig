import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { LoadData } from '../dashboard.servicedata';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnChanges {
  @Input() loadData: LoadData;

  public chartData: any[] = [];
  public chartOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
  public chartLabels: string[] = ['1 min', '5 min', '15 min'];
  public chartColors: any[] = [{
    backgroundColor: [
      'rgba(80, 80, 80, 0.6)',
      'rgba(120, 120, 120, 0.6)',
      'rgba(160, 160, 160, 0.6)',
    ],
  }];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loadData']) {
      const newData: LoadData = changes['loadData'].currentValue as LoadData;
      if (newData) {
        this.chartData = [{ data: newData.load_average }];
      } else {
        this.chartData = [];
      }
    }
  }
}
