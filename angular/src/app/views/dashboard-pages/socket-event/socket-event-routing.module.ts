import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketEventComponent } from './socket-event.component';

const routes: Routes = [
  { path: '', component: SocketEventComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocketEventRoutingModule {}
