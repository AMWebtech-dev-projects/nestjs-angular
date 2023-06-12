import { NgModule } from '@angular/core';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { ProfileSettingComponent, SharedUiModule } from '../../../shared-ui';


@NgModule({
  declarations: [ProfileSettingComponent],
  imports: [
    SharedUiModule,
    AdminProfileRoutingModule
  ]
})
export class AdminProfileModule { }
