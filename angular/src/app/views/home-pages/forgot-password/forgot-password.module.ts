import { NgModule } from '@angular/core';
import { SharedUiModule } from '../../../shared-ui';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [SharedUiModule, ForgotPasswordRoutingModule],
})
export class ForgotPasswordModule {}
