import { Component, Input, OnInit } from '@angular/core';
import { SystemData } from './dashboard.servicedata';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  @Input() systemData: SystemData;

  constructor() { }

  ngOnInit() {
  }
}
