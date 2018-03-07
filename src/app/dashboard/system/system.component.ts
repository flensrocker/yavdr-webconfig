import { Component, Input } from '@angular/core';
import { SystemData } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent {
  @Input() systemData: SystemData;

  constructor() {
  }
}
