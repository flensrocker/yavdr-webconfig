import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolsModule } from '../tools/tools.module';

import { DashboardService } from './dashboard.service';
import { DashboardServiceHttp } from './dashboard.service.http';
import { DashboardServiceMock } from './dashboard.service.mock';

import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SystemComponent } from './system/system.component';
import { UsageComponent } from './usage/usage.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { FanComponent } from './fan/fan.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToolsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    SystemComponent,
    UsageComponent,
    TemperatureComponent,
    FanComponent,
  ],
  providers: [
    { provide: DashboardService, useClass: DashboardServiceMock /*DashboardServiceHttp*/ },
  ]
})
export class DashboardModule { }
