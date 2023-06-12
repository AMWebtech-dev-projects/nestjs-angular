import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingComponent } from '../../../shared-ui/profile-setting/profile-setting.component';

const routes: Routes = [
  { path: '', component: ProfileSettingComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProfileRoutingModule { }
