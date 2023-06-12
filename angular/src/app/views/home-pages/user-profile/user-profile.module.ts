import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileSettingComponent, SharedUiModule } from '../../../shared-ui';


@NgModule({
  // declarations: [ProfileSettingComponent],
  imports: [
    SharedUiModule,
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
