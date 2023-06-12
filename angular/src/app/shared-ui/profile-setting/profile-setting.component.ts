import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { currentUser, GlobalService, JwtService, UsersService } from '..';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss'],
})
export class ProfileSettingComponent implements OnInit {
  title = 'Profile Setting | angular node training';
  currentUser: currentUser = new currentUser();
  userStaticDetail: any = {};
  requiredValidation: any = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };
  inValidateCheck: any = {
    phoneNumber: false,
    strongPasswordCheck: false,
  };

  //image upload Variable
  imageSrc: string = 'assets/img/brand/avatar.png';
  selectedFiles?: any = {
    imageInfo: [],
    imageUrl: '',
  };
  imageError: string = '';
  isImage: boolean = false;

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService,

  ) { }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
    this.currentUser = this.jwtService.getCurrentUser();
    this.userStaticDetail = { ...this.currentUser };
    this.patternMatchCheck(this.currentUser.phoneNumber, 'phoneNumber')
  }

  checkvalidation(key: any) {
    let profileValidate: any = { ...this.currentUser };
    if (profileValidate[key]) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }

  patternMatchCheck(profileValue: any, validateType: string) {
    const validate = this.globalService.patternMatchRegex(profileValue, validateType)
    this.inValidateCheck[validateType] = validate;
  }

  profileImageView() {
    if (this.selectedFiles.imageUrl) {
      return this.selectedFiles.imageUrl;
    } else if (this.currentUser?.profileImage) {
      return this.currentUser?.profileImage;
    } else {
      return this.imageSrc;
    }
  }

  deleteImg() {
    this.selectedFiles.imageUrl = '';
    this.selectedFiles.imageInfo = [];
    // this.imgFileInputVar.nativeElement.value = '';
    const oldImage = JSON.parse(JSON.stringify(this.currentUser.profileImage));
    if (oldImage) {
      this.currentUser.profileOldImage = oldImage;
    }
    this.currentUser.profileImage = '';
  }

  onFileChange(event: any) {
    const fileData = event.target.files[0];
    if (!fileData.name.match(/\.(jpg|jpeg|png)$/)) {
      this.toastr.warning(
        'You can upload only jpg, jpeg, png, gif image.',
        'Warning'
      );
      return false;
    }
    else if (event.target.files && event.target.files.length) {
      this.selectedFiles.imageInfo = event.target.files[0];
      const reader = new FileReader();// File Preview
      const [file] = event.target.files;

      reader.onload = (e: any) => {
        this.selectedFiles.imageUrl = e.target.result;
        // this.imageSrc = reader.result as string;
        this.isImage = true;
      };
      reader.readAsDataURL(file)
    }
    return;
  }

  uploadProfile() {
    const ObjectKeys = Object.keys(this.requiredValidation);
    let postData: any = { ...this.currentUser };
    const found = ObjectKeys.filter((key: any) => {
      return !postData[key];
    });
    // this.spinner.show();
    if (found.length) {
      this.toastr.warning('*Please Fill All Fields are mandatory.', 'Warning');
      this.spinner.hide();
      return false;
    } else if (postData.password && postData.password !== postData.confirm_password) {
      this.toastr.warning('*Please password vaidation.', 'Warning');
      this.spinner.hide();
      return false;
    }
    if (this.selectedFiles.imageInfo.name) {
      this.spinner.show();
      this.globalService.localUpload(this.selectedFiles.imageInfo, environment.uploadsFolder.profile).subscribe(
        (data: any) => {
          let postData: any = { ...this.currentUser };
          if (data.status === 200) {
            if (postData.profileImage) {
              postData.profileOldImage = postData.profileImage;
            }
            postData.profileImage = data.imgPath;
            this.saveUserInfo(postData);
            // this.spinner.hide();
          }
        },
        (error) => {
          console.log("error===========", error);
          this.spinner.hide();
          this.toastr.error(
            'There are some server error. Please check connection.',
            'Error'
          );
        }
      );
    } else {
      this.saveUserInfo(postData);
    }
    return;
  }

  saveUserInfo(postData: any) {
    let savePassword = postData.password;
    delete postData.confirm_password;
    this.usersService.saveUserInfo(postData).subscribe((data: any) => {
      this.spinner.hide();
      if (data.status === 200) {
        let userDetails = data.data;
        delete userDetails.profileOldImage;
        if (savePassword) {
          this.jwtService.destroyToken();
          this.globalService.logOut();
          this.router.navigate(["/login"]);
          this.toastr.success(data.message, 'Success');
        } else {
          this.toastr.success(data.message, 'Success');
          this.jwtService.saveCurrentUser(JSON.stringify(userDetails));
          this.currentUser = this.jwtService.getCurrentUser();
          this.userStaticDetail = { ...this.currentUser };
          this.globalService.sendActionChildToParent('updatedUserInfo')
        }
      } else {
        this.toastr.error(data.message, 'Error');
        this.spinner.hide();
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error, 'Error!');
    });
    return;
  }
}
