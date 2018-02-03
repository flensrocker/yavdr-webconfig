import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from './dashboard.service';
import { DashboardServiceHttp } from './dashboard.service.http';
import { DashboardServiceMock } from './dashboard.service.mock';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: DashboardService, useClass: DashboardServiceMock /*DashboardServiceHttp*/ },
  ]
})
export class DashboardModule { }
