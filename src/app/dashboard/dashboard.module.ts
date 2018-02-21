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
import { SystemComponent } from './system/system.component';
import { DiskComponent } from './disk/disk.component';
import { SwapComponent } from './swap/swap.component';
import { MemoryComponent } from './memory/memory.component';
import { LoadComponent } from './load/load.component';
import { UsageComponent } from './usage/usage.component';

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
    SystemComponent,
    DiskComponent,
    SwapComponent,
    MemoryComponent,
    LoadComponent,
    UsageComponent,
  ],
  providers: [
    { provide: DashboardService, useClass: DashboardServiceMock /*DashboardServiceHttp*/ },
  ]
})
export class DashboardModule { }
