import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedUiModule } from '../../../shared-ui';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedUiModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
