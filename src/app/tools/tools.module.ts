import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

import { ErrorComponent } from './error.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ErrorComponent,
    SpinnerComponent,
  ],
  declarations: [
    ErrorComponent,
    SpinnerComponent,
  ]
})
export class ToolsModule { }
