import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolsModule } from '../tools/tools.module';

import { DashboardService } from './dashboard.service';
import { DashboardServiceHttp } from './dashboard.service.http';
import { DashboardServiceMock } from './dashboard.service.mock';

import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CpuComponent } from './cpu.component';
import { CpuUsageComponent } from './cpu-usage.component';
import { SystemComponent } from './system.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToolsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    CpuComponent,
    CpuUsageComponent,
    SystemComponent,
  ],
  providers: [
    { provide: DashboardService, useClass: DashboardServiceMock /*DashboardServiceHttp*/ },
  ]
})
export class DashboardModule { }
