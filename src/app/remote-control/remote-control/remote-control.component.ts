import { Component } from '@angular/core';

import {
  ErrorData,
} from '../../tools';

import { RemoteControlService, KeyName, HitkeyRequest } from '../remote-control.service';

@Component({
  selector: 'app-remote-control',
  templateUrl: './remote-control.component.html',
  styleUrls: ['./remote-control.component.scss']
})
export class RemoteControlComponent {
  public error = new ErrorData();

  constructor(private _service: RemoteControlService) {
  }

  hitkey(key: KeyName): void {
    this._service.hitkey(new HitkeyRequest(key))
      .subscribe(() => {
      }, (err: any) => {
        this.error.addError(err);
      });
  }
}
