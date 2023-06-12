import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout.component';
import { isFalseAuthGuard } from '../../shared-ui';

const routes: Routes = [
  {
    path: '', // JUST LOAD HERE HOME LAYOUT COMPONENT FOR HEADER AND FOOTER AND MIDDLE COMPONENT NO NEED TO LOAD ANY PATH URL BECAUSE WE ARE USING SIMPLE URL. IT WILL LOADS JUST DASHBOARD CHILD MODULES.
    component: HomeLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../views/home-pages/home/home.module').then(
            (mod) => mod.HomeModule
          ),
      },
      {
        path: 'signup',
        canActivate: [isFalseAuthGuard],
        loadChildren: () =>
          import('../../views/home-pages/signup/signup.module').then(
            (mod) => mod.SignupModule
          ),
      },
      {
        path: 'login',
        canActivate: [isFalseAuthGuard],
        loadChildren: () =>
          import('../../views/home-pages/login/login.module').then(
            (mod) => mod.LoginModule
          ),
      },
      {
        path: 'forgot-password',
        canActivate: [isFalseAuthGuard],
        loadChildren: () =>
          import(
            '../../views/home-pages/forgot-password/forgot-password.module'
          ).then((mod) => mod.ForgotPasswordModule),
      },
      {
        path: 'recoverpassword/:userId/:token',
        loadChildren: () =>
          import(
            '../../views/home-pages/recovery-password/recovery-password.module'
          ).then((mod) => mod.RecoveryPasswordModule),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('../../views/home-pages/about-us/about-us.module').then(
            (mod) => mod.AboutUsModule
          ),
      },

      {
        path: 'about-us',
        loadChildren: () =>
          import('../../views/home-pages/about-us/about-us.module').then(
            (mod) => mod.AboutUsModule
          ),
      },
      {
        path: 'contact-us',
        loadChildren: () =>
          import('../../views/home-pages/contact-us/contact-us.module').then(
            (mod) => mod.ContactUsModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import(
            '../../views/home-pages/user-profile/user-profile.module'
          ).then((mod) => mod.UserProfileModule),
      },
      { path: '**', redirectTo: 'error-404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLayoutRoutingModule { }
