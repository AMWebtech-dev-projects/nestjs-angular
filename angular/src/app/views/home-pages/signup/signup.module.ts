import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedUiModule } from '../../../shared-ui';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    SharedUiModule,
    SignupRoutingModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class SignupModule { }
