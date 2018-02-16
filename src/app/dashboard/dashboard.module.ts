import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolsModule } from '../tools/tools.module';

import { DashboardService } from './dashboard.service';
import { DashboardServiceHttp } from './dashboard.service.http';
import { DashboardServiceMock } from './dashboard.service.mock';

import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CpuComponent } from './cpu/cpu.component';
import { CpuUsageComponent } from './cpu/cpu-usage.component';
import { SystemComponent } from './system/system.component';
import { DiskComponent } from './disk/disk.component';
import { SwapComponent } from './swap/swap.component';

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
    DiskComponent,
    SwapComponent,
  ],
  providers: [
    { provide: DashboardService, useClass: DashboardServiceMock /*DashboardServiceHttp*/ },
  ]
})
export class DashboardModule { }
