import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit {
  socialUser: SocialUser = new SocialUser();
  isLoggedin: boolean = false;
  constructor(private socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {

  }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp: any) => {
        console.log(resp.email, 'response === ', resp);
        if (resp.authToken) {
          this.socialUser = resp;
          this.isLoggedin = resp != null;
          this.doLoginWithdb();
        }
      });
  }
  doLoginWithdb() {
    // now you can access the data form the socialUser var and save in DB
  }
}
