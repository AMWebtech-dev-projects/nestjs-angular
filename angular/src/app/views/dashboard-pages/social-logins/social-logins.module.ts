import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialLoginRoutingModule } from './social-logins-routing.module';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { FbLoginComponent } from './fb-login/fb-login.component';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    GoogleLoginComponent,
    FbLoginComponent,
  ],
  imports: [
    CommonModule,
    SocialLoginRoutingModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1051803384347-91967jipju1ume5ul4dcr5g84bfaja56.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1021719995343949')
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class SocialLoginsModule { }
