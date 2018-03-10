import { Component } from '@angular/core';

import { RemoteControlService } from '../remote-control.service';

@Component({
  selector: 'app-remote-control',
  templateUrl: './remote-control.component.html',
  styleUrls: ['./remote-control.component.scss']
})
export class RemoteControlComponent {
  constructor(private _service: RemoteControlService) {
  }
}
