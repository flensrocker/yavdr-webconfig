import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
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

import { AuthGuard } from './auth/auth-guard';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthService } from './auth/auth.service';
import { UpdateService } from './update/update.service';

import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
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
    MatDialogModule,
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
    LoginModalComponent,
    SpinnerComponent,
    UpdateComponent,
  ],
  declarations: [
    ErrorComponent,
    LoginComponent,
    LoginModalComponent,
    SpinnerComponent,
    UpdateComponent,
  ],
  entryComponents: [
    LoginModalComponent,
  ],
  providers: [
  ]
})
export class ToolsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToolsModule, providers: [
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthService,
        UpdateService,
      ]
    };
  }
}
