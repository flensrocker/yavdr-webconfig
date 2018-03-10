import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ToolsModule } from './tools/tools.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';

import { AuthOptions } from './tools';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

const _authOptions: AuthOptions = {
  homeUrl: '/home',
  loginUrl: '/login',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
