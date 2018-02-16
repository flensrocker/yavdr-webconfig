import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { DiskUsageData } from '../dashboard.service';

@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.scss']
})
export class DiskComponent implements OnChanges {
  @Input() diskData: DiskUsageData;
  public chartData: number[] = [];
  public chartLabels: string[] = [];
  public chartOptions = {
    title: {
      display: true,
      text: 'no disk usage found'
    },
    tooltips: {
      enabled: false
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['diskData']) {
      const newData: DiskUsageData = changes['diskData'].currentValue as DiskUsageData;
      if (newData) {
        this.chartOptions.title.text = `${newData.device} mounted on ${newData.mountpoint} (total: ${newData.total_human.value} ${newData.total_human.unit})`;
        this.chartData = [
          newData.used,
          newData.free,
        ];
        this.chartLabels = [
          `${newData.used_human.value} ${newData.used_human.unit} used`,
          `${newData.free_human.value} ${newData.free_human.unit} free`,
        ];
      } else {
        this.chartOptions.title.text = `no disk usage found`;
        this.chartData = [];
        this.chartLabels = [];
      }
    }
  }
}
