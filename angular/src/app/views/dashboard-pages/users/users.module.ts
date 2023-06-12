import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { SharedUiModule } from '../../../shared-ui';
import { SignupComponent } from '../../home-pages/signup/signup.component';
import { DtServerComponent } from './dt-server/dt-server.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, DtServerComponent],
  imports: [SharedUiModule, UsersRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class UsersModule { }
