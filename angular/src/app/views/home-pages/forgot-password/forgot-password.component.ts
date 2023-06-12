import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalService, UsersService } from '../../../shared-ui';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  title = 'Forgot Password | angular node training';
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  forgotPasswordInfo: any = {
    email: 'bharat@amwebtech.com',
  };

  constructor(
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.globalService.getPageTitle(this.title);
  }

  forgotPassword() {
    // this.spinner.show();
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;
    this.usersService.forgotPassword(this.forgotPasswordInfo).subscribe(
      {
        next: (data: any) => {
          console.log('data', data);
          if (data.status === 200) {
            this.toastr.success(data.message, 'Success');
            this.successMessage = data.message;
            this.spinner.hide();
            this.loading = false;
          } else {
            this.toastr.error(data.message, 'Error');
            this.errorMessage = data.message;
            this.spinner.hide();
            this.loading = false;
          }
          this.forgotPasswordInfo.email = '';
        },
        error: (error: any) => {
          this.toastr.error(
            'There are some server Please check connection.',
            'Error'
          );
          this.forgotPasswordInfo.email = '';
          this.spinner.hide();
        }
      }
    );
  }
}
