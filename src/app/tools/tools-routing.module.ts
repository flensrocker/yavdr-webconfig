import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const toolsRoutes: Routes = [
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(toolsRoutes)],
    exports: [RouterModule]
})
export class ToolsRoutingModule { }
