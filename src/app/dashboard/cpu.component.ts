import { Component, Input, OnInit } from '@angular/core';
import { SystemStatusData } from './dashboard.servicedata';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {
  @Input() SystemStatus: SystemStatusData;

  constructor() {
   }

  ngOnInit() {
  }
}
