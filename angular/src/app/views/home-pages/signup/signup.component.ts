import { Component, OnInit } from '@angular/core';
import { signUp } from './models/signup.model';
import { ToastrService } from 'ngx-toastr';
import { GlobalService, AlertService, UsersService } from '../../../shared-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  title = 'Sign Up | angular node training';
  signupInfo: signUp = new signUp();

  inValidateCheck: any = {
    email: false,
    emailExits: true,
    phoneNumber: false,
    strongPasswordCheck: false,
  };

  requiredValidation: any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirm_password: '',
    dob: '',
  };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private globalService: GlobalService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
  }

  patternMatchCheck(signupInfoValue: any, validateType: string) {
    const validate = this.globalService.patternMatchRegex(
      signupInfoValue,
      validateType
    );
    this.inValidateCheck[validateType] = validate;
    if (this.inValidateCheck[validateType] && validateType === 'email') {
      validateType = 'emailExits';
      this.usersService
        .emailAlreadyExists({ email: signupInfoValue })
        .subscribe(
          {
            next: (data: any) => {
              if (data.status == 200) {
                this.inValidateCheck[validateType] = false;
              } else {
                this.inValidateCheck[validateType] = true;
              }
            },
            error: (error: any) => {
              this.inValidateCheck[validateType] = false;
            }
          }
        );
    }
  }

  doSignUp() {
    const self = this;
    const ObjectKeys = Object.keys(this.requiredValidation);
    let postData = JSON.parse(JSON.stringify(self.signupInfo)); //IT BROKES TWO WAY DATABINDING
    const found = ObjectKeys.filter((obj: any) => {
      return !postData[obj];
    });
    const found2 = Object.keys(this.inValidateCheck).filter((obj2: any) => {
      return !self.inValidateCheck[obj2];
    });
    this.spinner.show();
    if (
      found.length ||
      found2.length ||
      self.signupInfo.password !== self.signupInfo.confirm_password
    ) {
      this.alertService.clear();
      this.alertService.error('*Please Fill All Fields are mandatory.');
      this.spinner.hide();
      return false;
    }
    let signUpPostData = JSON.parse(JSON.stringify(this.signupInfo)); //IT BROKES TWO WAY DATABINDING
    // signUpPostData.email=
    signUpPostData.dob = moment(signUpPostData.dob).format('DD/MM/YYYY');
    // HERE WE CAN CALL API FOR SAVING DATA
    this.usersService.saveUserInfo(signUpPostData).subscribe(
      {
        next: (data: any) => {
          this.spinner.hide();
          if (data.status == 200) {
            this.toastr.success(data.message, 'Success!');
            this.router.navigate(['/login']);
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error!');
        }
      }
    );
    return;
  }
}
