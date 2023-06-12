import { NgModule } from '@angular/core';
import { SharedUiModule } from '../../../shared-ui';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    SharedUiModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
