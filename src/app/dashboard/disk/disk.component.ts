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
    tooltips: {
      enabled: false
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['diskData']) {
      let newDiskData: DiskUsageData = changes['diskData'].currentValue as DiskUsageData;
      this.chartData = [
        newDiskData.used,
        newDiskData.free
      ];
      this.chartLabels = [
        newDiskData.used_human.value + ' ' + newDiskData.used_human.unit + ' used',
        newDiskData.free_human.value + ' ' + newDiskData.free_human.unit + ' free'
      ];
    }
  }
}
