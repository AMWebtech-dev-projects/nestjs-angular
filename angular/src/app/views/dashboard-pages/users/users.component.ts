import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AlertService,
  currentUser,
  GlobalService,
  UsersService,
} from '../../../shared-ui';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  title = 'Manage Users | Estimation Calculator';
  userInfo: currentUser = new currentUser();
  userRoles: any = environment.role;
  usersList: any[] = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  newUserAlready = false;
  @ViewChild('deleteUserModal', { static: false })
  public deleteUserModal: any = ModalDirective;

  inValidateCheck: any = {
    email: false,
    emailExits: true,
  };

  constructor(
    private globalService: GlobalService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) {
    this.getUsersList();
  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [
        {
          targets: 4,
          orderable: false,
          searchable: false,
        },
        {
          targets: 5,
          orderable: false,
          searchable: false,
        },
      ],
    };
    this.userRoles = Object.keys(this.userRoles); //convert object to array
    this.globalService.getPageTitle(this.title);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next('');
  }

  getUsersList() {
    this.usersService.getUsersList().subscribe(
      {
        next: (dataRes: any) => {
          this.spinner.show();
          if (dataRes.status == 200) {
            this.spinner.hide();
            this.datatableElement.dtInstance.then(
              (dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next('');
                this.usersList = dataRes.data;
                this.spinner.hide();
              }
            );
            // console.log("userList",this.usersList);
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error!');
        }
      }
    );
  }

  checkvalidation(key: any) {
    let Validate: any = { ...this.userInfo };
    if (Validate[key]) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }

  patternMatchCheck(userInfoValue: any, validateType: string) {
    if (userInfoValue) {
      const validate = this.globalService.patternMatchRegex(
        userInfoValue,
        validateType
      );
      this.inValidateCheck[validateType] = validate;
      if (this.inValidateCheck[validateType] && validateType === 'email') {
        validateType = 'emailExits';
        userInfoValue = userInfoValue + environment.emaildomain;
        this.usersService
          .emailAlreadyExists({ email: userInfoValue })
          .subscribe(
            (dataRes: any) => {
              if (dataRes.status === 200) {
                this.inValidateCheck[validateType] = false;
              } else {
                this.inValidateCheck[validateType] = true;
              }
            },
            (error: any) => {
              this.inValidateCheck[validateType] = false;
            }
          );
      } else {
        this.inValidateCheck[validateType] = validate;
        this.inValidateCheck.emailExits = true;
      }
    } else {
      this.inValidateCheck[validateType] = true;
    }
  }

  closeModel() {
    this.deleteUserModal.hide();
  }

  showUserDeleteModal(user: any) {
    this.userInfo = user;
    this.deleteUserModal.show();
  }

  deleteUser() {
    this.spinner.show();
    console.log('DELETE USER parms:::::', this.userInfo._id);
    this.usersService.deleteUser(this.userInfo).subscribe(
      {
        next: (dataRes: any) => {

          if (dataRes.status === 200) {
            this.closeModel();
            this.spinner.hide();
            this.getUsersList();
            this.toastr.success('User deleted successfully.', 'Success');
          }
        },
        error: (error: any) => {
          this.closeModel();
          this.spinner.hide();
          this.toastr.error(
            'There are some server error. Please check connection.',
            'Error'
          );
        }
      }
    );
  }

  changeUserStatus(user: any) {
    let postData = {
      _id: user._id,
      status: user.status ? 0 : 1,
    };
    // HERE WE CAN CALL API FOR SAVING DATA
    this.usersService.saveUserInfo(postData).subscribe(
      {
        next: (dataRes: any) => {
          if (dataRes.status === 200) {
            dataRes = dataRes.data;
            this.spinner.hide();
            this.toastr.success(
              'User status has been changed successfully.',
              'Success!'
            );
            let index = this.usersList.findIndex((x) => x._id === dataRes._id);
            if (index) {
              this.usersList[index].status = dataRes.status;
            }
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error!');
        }
      }
    );
  }
}
