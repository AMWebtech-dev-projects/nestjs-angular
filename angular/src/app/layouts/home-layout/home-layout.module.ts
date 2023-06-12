import { NgModule } from '@angular/core';
import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { HomeLayoutComponent } from './home-layout.component';
import { SharedUiModule } from '../../shared-ui';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [SharedUiModule, ModalModule.forRoot(), HomeLayoutRoutingModule],
})
export class HomeLayoutModule {}
