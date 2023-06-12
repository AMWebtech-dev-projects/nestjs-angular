import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.scss'],
})
export class FbLoginComponent implements OnInit {
  socialUser: SocialUser = new SocialUser();
  isLoggedin: boolean = false;
  constructor(private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  loginWithFacbook() {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((resp: any) => {
        if (resp.thoken) {
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
