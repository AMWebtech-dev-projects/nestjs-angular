import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryPasswordRoutingModule } from './recovery-password-routing.module';
import { RecoveryPasswordComponent } from './recovery-password.component';
import { SharedUiModule } from '../../../shared-ui';

@NgModule({
  declarations: [
    RecoveryPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    RecoveryPasswordRoutingModule
  ]
})
export class RecoveryPasswordModule { }
