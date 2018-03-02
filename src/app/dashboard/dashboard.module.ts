import { NgModule } from '@angular/core';

import { ToolsModule } from '../tools/tools.module';

import { DashboardService } from './dashboard.service';
import { DashboardServiceHttp } from './dashboard.service.http';

import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SystemComponent } from './system/system.component';
import { UsageComponent } from './usage/usage.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { FanComponent } from './fan/fan.component';

@NgModule({
  imports: [
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
    { provide: DashboardService, useClass: DashboardServiceHttp },
  ]
})
export class DashboardModule { }
