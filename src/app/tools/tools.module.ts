import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
} from '@angular/material';

import { ErrorComponent } from './error.component';
import { SpinnerComponent } from './spinner.component';
import { UpdateService } from './update.service';
import { UpdateComponent } from './update.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    ErrorComponent,
    SpinnerComponent,
    UpdateComponent,
  ],
  declarations: [
    ErrorComponent,
    SpinnerComponent,
    UpdateComponent,
  ]
})
export class ToolsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToolsModule, providers: [
        UpdateService,
      ]
    };
  }
}
