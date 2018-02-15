import { Component, Input, OnInit } from '@angular/core';
import { CpuData } from './dashboard.servicedata';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {
  @Input() cpuData: CpuData;

  constructor() {
   }

  ngOnInit() {
  }
}
