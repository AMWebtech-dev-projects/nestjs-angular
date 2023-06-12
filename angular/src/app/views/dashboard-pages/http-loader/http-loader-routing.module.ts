import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpLoaderComponent } from './http-loader.component';

const routes: Routes = [
  { path: '', component: HttpLoaderComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttpLoaderRoutingModule { }
