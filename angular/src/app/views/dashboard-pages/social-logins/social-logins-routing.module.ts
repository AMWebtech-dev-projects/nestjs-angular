import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbLoginComponent } from './fb-login/fb-login.component';
import { GoogleLoginComponent } from './google-login/google-login.component';

const routes: Routes = [
  { path: 'google-login', component: GoogleLoginComponent, pathMatch: 'full' },
  { path: 'fb-login', component: FbLoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialLoginRoutingModule { }
