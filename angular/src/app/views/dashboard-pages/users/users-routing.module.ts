import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DtServerComponent } from './dt-server/dt-server.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'api-ui-pagination', component: DtServerComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
