import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { AuthGuard } from '../../shared-ui';

const routes: Routes = [
  {
    path: '', // JUST LOAD HERE DASHBOARD LAYOUT COMPONENT FOR HEADER AND FOOTER AND MIDDLE COMPONENT NO NEED TO LOAD ANY PATH URL BECAUSE WE ARE USING SIMPLE URL. IT WILL LOADS JUST DASHBOARD CHILD  MODULES.
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import(
            '../../views/dashboard-pages/dashboard/dashboard/dashboard.module'
          ).then((mod) => mod.DashboardModule),
      },
      {
        path: 'social-login',
        loadChildren: () =>
          import('../../views/dashboard-pages/social-logins/social-logins.module').then((mod) => mod.SocialLoginsModule)
      },
      {
        path: 'nest-js-socket',
        loadChildren: () =>
          import('../../views/dashboard-pages/socket-event/socket-event.module').then((mod) => mod.SocketEventModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../../views/dashboard-pages/users/users.module').then(
            (mod) => mod.UsersModule
          ),
      },
      {
        path: 'admin-profile',
        loadChildren: () =>
          import(
            '../../views/dashboard-pages/admin-profile/admin-profile.module'
          ).then((mod) => mod.AdminProfileModule),
      },
      {
        path: 'fileUploadProgress',
        loadChildren: () =>
          import(
            '../../views/dashboard-pages/http-loader/http-loader.module'
          ).then((mod) => mod.HttpLoaderModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardLayoutRoutingModule { }
