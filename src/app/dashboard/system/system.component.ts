import { Component, Input } from '@angular/core';
import { SystemData } from '../dashboard.servicedata';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent {
  @Input() systemData: SystemData;

  constructor() {
  }
}
