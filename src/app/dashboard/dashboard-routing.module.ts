import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../tools';

import { DashboardComponent } from './dashboard.component';
import { CpuComponent } from './cpu.component';
import { SystemComponent } from './system.component';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'system', component: SystemComponent },
            { path: 'cpu', component: CpuComponent },
            { path: '', redirectTo: 'system', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
