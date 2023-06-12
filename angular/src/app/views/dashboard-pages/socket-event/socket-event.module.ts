import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketEventRoutingModule } from './socket-event-routing.module';
import { SocketEventComponent } from './socket-event.component';
import { SharedUiModule } from '../../../shared-ui';

@NgModule({
  declarations: [SocketEventComponent],
  imports: [CommonModule, SocketEventRoutingModule, SharedUiModule],
})
export class SocketEventModule {}
