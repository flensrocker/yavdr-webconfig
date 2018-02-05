import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
} from '@angular/material';

import { ErrorComponent } from './error.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ErrorComponent,
    SpinnerComponent,
  ],
  declarations: [
    ErrorComponent,
    SpinnerComponent,
  ]
})
export class ToolsModule { }
