import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
} from '@angular/material';

import { SpinnerComponent } from './spinner.component';

export { SpinnerData } from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    SpinnerComponent,
  ],
  declarations: [SpinnerComponent]
})
export class ToolsModule { }
