import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { GlobalService, JwtService, UsersService } from '../../../shared-ui';

class loginUser {
  email: string = '';
  password: string = '';
  remember: boolean = false;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Login | angular node training';
  login: loginUser = new loginUser();
  currentUser: any;

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private globalService: GlobalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
    this.globalService.getPageTitle(this.title);
    let rememberMeCookie = this.jwtService.getCookie(environment.cookieToken);
    if (rememberMeCookie) {
      this.login = rememberMeCookie;
    }
  }

  // HERE WE are doing login with api
  doLogin() {
    let loginPostData = this.login;
    this.spinner.show();
    if (loginPostData.remember) {
      this.jwtService.setCookie(environment.cookieToken, loginPostData);
    } else {
      this.jwtService.deleteCookie(environment.cookieToken);
    }
    this.usersService.doSignIn(loginPostData).subscribe(
      {
        next: (data: any) => {
          this.spinner.hide();
          if (data.status == 200) {
            let userDetails = data.data;
            this.toastr.success(data.message, 'Success');
            this.jwtService.saveToken(userDetails.authorization);
            this.jwtService.saveCurrentUser(JSON.stringify(userDetails));
            this.jwtService.getCurrentUser();
            this.globalService.sendActionChildToParent('Loggin');
            if (userDetails && userDetails.role === environment.role.adminRole) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.toastr.error(data.message, 'Error');
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error');
        }
      }
    );
  }
}
