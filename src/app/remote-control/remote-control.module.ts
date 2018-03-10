import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsModule } from '../tools/tools.module';

import { RemoteControlRoutingModule } from './remote-control-routing.module';

import { RemoteControlService } from './remote-control.service';
import { RemoteControlComponent } from './remote-control/remote-control.component';

@NgModule({
  imports: [
    CommonModule,
    ToolsModule,
    RemoteControlRoutingModule,
  ],
  declarations: [RemoteControlComponent],
  providers: [
    RemoteControlService,
  ]
})
export class RemoteControlModule { }
