import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedUiModule } from '../../../shared-ui';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedUiModule,
    HomeRoutingModule,
    CarouselModule,
  ],
})
export class HomeModule { }
