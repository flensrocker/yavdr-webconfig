import { Component, Input, OnInit } from '@angular/core';
import { SystemStatusData } from './dashboard.servicedata';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  @Input() SystemStatus: SystemStatusData;

  constructor() { }

  ngOnInit() {
  }
}
