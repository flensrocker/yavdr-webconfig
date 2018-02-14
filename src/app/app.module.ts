import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ToolsModule } from './tools/tools.module';
import { AuthOptions } from './tools';

const _authOptions: AuthOptions = new AuthOptions('/login', '/dashboard');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ToolsModule.forRoot(),
    DashboardModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: AuthOptions, useValue: _authOptions },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
