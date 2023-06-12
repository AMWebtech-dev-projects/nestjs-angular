import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpLoaderRoutingModule } from './http-loader-routing.module';
import { HttpLoaderComponent } from './http-loader.component';
import { SharedUiModule } from '../../../shared-ui';

@NgModule({
  declarations: [HttpLoaderComponent],
  imports: [
    CommonModule,
    HttpLoaderRoutingModule,
    CommonModule,
    SharedUiModule,
  ],
})
export class HttpLoaderModule {}
