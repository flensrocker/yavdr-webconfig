import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.css']
})
export class CpuUsageComponent implements OnInit {
  @Input() CpuUsage: number;

  constructor() { }

  ngOnInit() {
  }

}
