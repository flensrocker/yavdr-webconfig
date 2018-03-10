import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoteControlComponent } from './remote-control/remote-control.component';

const routes: Routes = [
  { path: 'remote-control', component: RemoteControlComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteControlRoutingModule { }
