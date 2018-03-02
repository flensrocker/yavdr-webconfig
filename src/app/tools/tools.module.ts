import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { ToolsRoutingModule } from './tools-routing.module';

import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
import { AuthServiceHttp } from './auth.service.http';
import { UpdateService } from './update.service';

import { ErrorComponent } from './error.component';
import { LoginComponent } from './login.component';
import { SpinnerComponent } from './spinner.component';
import { UpdateComponent } from './update.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ChartsModule,
    ToolsRoutingModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ChartsModule,
    ErrorComponent,
    LoginComponent,
    SpinnerComponent,
    UpdateComponent,
  ],
  declarations: [
    ErrorComponent,
    LoginComponent,
    SpinnerComponent,
    UpdateComponent,
  ],
  providers: [
  ]
})
export class ToolsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToolsModule, providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceHttp },
        UpdateService,
      ]
    };
  }
}
