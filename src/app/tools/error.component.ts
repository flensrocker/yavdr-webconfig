import { Component, Input } from '@angular/core';

import { ErrorData } from './error-data';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  @Input() error: ErrorData;

  constructor() { }
}
