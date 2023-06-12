import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment';
import {
  AlertService,
  currentUser,
  GlobalService,
  UsersService,
} from '../../../../shared-ui';

class DataTablesResponse {
  data: any[] = [];
  draw!: number;
  recordsFiltered!: number;
  recordsTotal!: number;
}
@Component({
  selector: 'app-dt-server',
  templateUrl: './dt-server.component.html',
  styleUrls: ['./dt-server.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DtServerComponent implements OnInit {
  // @Input() user: any;
  userDetails: any;
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

  @ViewChild('editUserModal', { static: false })
  public editUserModal: any = ModalDirective;

  inValidateCheck: any = {
    email: false,
    emailExits: true,
  };

  customStart = 0;
  constructor(
    private globalService: GlobalService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataTableCofig();
    this.userRoles = Object.keys(this.userRoles); //convert object to array
    this.globalService.getPageTitle(this.title);
  }
  ngAfterViewInit(): void { }

  showUserEditModal(user: any) {
    this.editUserModal.show();
    user.dob = new Date(moment(user.dob).format('DD/MM/YYYY'));

    this.userDetails = Object.assign({}, user);
    // this.userUpdate(user);
  }

  // userUpdate(userInfo: any) {
  //   this.editUserModal.hide();
  // }

  reInitDataTable(): void {
    try {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    } catch (err) { }
  }

  dataTableCofig() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: true,
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      pageLength: 10,
      lengthChange: false,
      columnDefs: [{ orderable: false, searchable: false, targets: [0, 3, 4, 5] }],
      order: [[1, 'asc']],
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.getUsersList(dataTablesParameters, callback);
      },
      retrieve: true,
      columns: [
        { data: 'sr-number' },
        { data: 'firstName' },
        { data: 'email' },
        { data: 'role' },
        { data: 'Action' },
      ],
    };
  }

  getUsersList(dataTablesParameters?: any, callback?: any) {
    const self = this;
    this.usersService.getUsersListServer(dataTablesParameters).subscribe(
      {
        next: (dataRes: any) => {
          // this.spinner.show();
          if (dataRes.status == 200) {
            const myRec = dataRes.data;
            // this.globalService.sendActionChildToParent('stop');

            this.customStart = dataTablesParameters.start + 1;
            this.usersList = myRec.data;
            callback({
              recordsTotal: myRec.recordsTotal,
              recordsFiltered: myRec.recordsFiltered,
              data: [],
            });
          }
        },
        error: (error: any) => {
          this.globalService.sendActionChildToParent('stop');
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
            {
              next: (dataRes: any) => {
                if (dataRes.status === 200) {
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
    this.editUserModal.hide();
  }

  showUserDeleteModal(user: any) {
    this.userInfo = user;
    this.deleteUserModal.show();
  }

  deleteUser() {
    // this.spinner.show();
    // this.globalService.sendActionChildToParent('showLoading');
    this.usersService.deleteUser(this.userInfo).subscribe(
      {
        next: (dataRes: any) => {
          if (dataRes.status === 200) {
            this.closeModel();
            // this.globalService.sendActionChildToParent('stop');
            // this.getUsersList();
            this.reInitDataTable();
            this.toastr.success('User deleted successfully.', 'Success');
          }
        },
        error: (error: any) => {
          this.closeModel();
          this.globalService.sendActionChildToParent('stop');
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
            this.globalService.sendActionChildToParent('stop');
            this.toastr.success(
              'User status has been changed successfully.',
              'Success!'
            );
            let index = this.usersList.findIndex((x) => x._id === dataRes._id);
            if (index) {
              this.usersList[index].status = dataRes.status;
              this.reInitDataTable();
            }
          }
        },
        error: (error: any) => {
          this.globalService.sendActionChildToParent('stop');
          this.toastr.error(error.message, 'Error!');
        }
      }
    );
  }

  addUpdateUser(event: any) {
    var successMessage =
      event._id === this.userDetails._id
        ? 'User Details update successfully'
        : 'User Created successfully';
    if (event) {
      this.getUsersList();
      this.editUserModal.hide();
      this.toastr.success(successMessage, 'Success');
    }
  }
}
