import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalService, JwtService, UsersService } from '../../../shared-ui';

class userReset {
  newPass: string = '';
  newConfPass: string = '';
}

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {
  title = 'Recover Password | angular node training';
  userResetInfo: userReset = new userReset();
  userId: any;
  link: any;
  userInfo: any = {};
  expiredLinkErrorMsg: String = '';

  viewInputType: any = {
    newPassType: 'password',
    newConfType: 'password',
  };

  inValidateCheck: any = {
    strongPasswordCheck: false,
  };

  requiredValidation: any = {
    newPass: '',
    newConfPass: '',
  };

  constructor(
    private jwtService: JwtService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.userId = res.userId;
      this.link = res.token;
      if (this.userId && this.link) {
        this.jwtService.destroyToken();
        this.globalService.logOut();
        this.getUserData();
      }
    });

    this.globalService.getPageTitle(this.title);
  }

  changeInputType(keyType: any) {
    if (this.viewInputType[keyType] === 'password') {
      this.viewInputType[keyType] = 'text';
    } else {
      this.viewInputType[keyType] = 'password';
    }
  }

  patternMatchCheck(signupInfoValue: any, validateType: string) {
    const validate = this.globalService.patternMatchRegex(
      signupInfoValue,
      validateType
    );
    this.inValidateCheck[validateType] = validate;
  }

  getUserData() {
    this.spinner.show();
    const postData = {
      _id: this.userId,
      forgotLink: this.link,
    };
    this.usersService.getUserInfo(postData).subscribe(
      {
        next: (data) => {
          if (data.status === 200) {
            this.userInfo = data.data;
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.expiredLinkErrorMsg = data.message;
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error(error, 'Error');
        }
      }
    );
  }

  resetPassword() {
    const ObjectKeys = Object.keys(this.requiredValidation);
    let postData = JSON.parse(JSON.stringify(this.userResetInfo)); //IT BROKES TWO WAY DATABINDING
    const found = ObjectKeys.filter((obj: any) => {
      return !postData[obj];
    });
    this.spinner.show();
    if (
      found.length ||
      !this.inValidateCheck.strongPasswordCheck ||
      this.userResetInfo.newPass !== this.userResetInfo.newConfPass
    ) {
      this.toastr.warning('*Please Fill All Fields are mandatory.', 'Warning');
      this.spinner.hide();
      return false;
    }

    let resetPasswordData = JSON.parse(JSON.stringify(this.userResetInfo)); //IT BROKES TWO WAY DATABINDING
    const resetPostData = {
      _id: this.userInfo._id,
      password: resetPasswordData.newPass,
      forgotLink: '',
      forgotStatus: 0,
    };

    this.usersService.saveUserInfo(resetPostData).subscribe(
      {
        next: (data: any) => {
          console.log('datadatadatadatadata', data);

          this.spinner.hide();
          if (data.status === 200) {
            this.toastr.success(data.message, 'Success!');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(data.message, 'Error');
            this.spinner.hide();
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error, 'Error!');
        }
      }
    );
    return;
  }
}
