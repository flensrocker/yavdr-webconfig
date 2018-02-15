import { Component, Input } from '@angular/core';
import { DiskUsageData } from '../dashboard.service';

@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.scss']
})
export class DiskComponent {
  @Input() diskData: DiskUsageData;

  constructor() {
  }
}
