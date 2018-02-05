import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material';

import { ErrorComponent } from './error.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    ErrorComponent,
    SpinnerComponent,
  ],
  declarations: [
    ErrorComponent,
    SpinnerComponent,
  ]
})
export class ToolsModule { }
