import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsModule } from '../tools/tools.module';

import { DashboardService } from './dashboard.service';
import { DashboardServiceHttp } from './dashboard.service.http';
import { DashboardServiceMock } from './dashboard.service.mock';

import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ToolsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    { provide: DashboardService, useClass: DashboardServiceMock /*DashboardServiceHttp*/ },
  ]
})
export class DashboardModule { }
