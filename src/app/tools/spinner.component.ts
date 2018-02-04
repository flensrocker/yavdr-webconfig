import { Component, Input } from '@angular/core';

import { SpinnerData } from './spinner-data';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() Data: SpinnerData;

  constructor() {
  }
}
