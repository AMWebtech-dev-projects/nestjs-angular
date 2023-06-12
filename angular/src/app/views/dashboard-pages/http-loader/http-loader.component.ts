import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GlobalService, UsersService } from '../../../shared-ui';
var FliteRes: any = {}
@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss'],
})
export class HttpLoaderComponent implements OnInit {
  segment: any = [];
  domesticRoundtrip = false;
  newAlldata: any = [];
  bundleAllData: any = [];
  arilinesList: any = [];
  progress: any = null;
  subscription: Subscription = new Subscription();
  constructor(
    private usersService: UsersService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.getUsersList();
  }

  ngOnInit(): void {
    this.subscription = this.globalService
      .getProgress()
      .subscribe((message) => {
        console.log("message=========", message);
        if (message) {
          this.progress = message.text;
        }
      });
  }

  async getUsersList() {

  }

  uploadFlieProgress($event: any) {
    let file: any = $event.target.files[0]
    console.log("file=======", file)
    this.globalService.FileUploadProgressBar(file).subscribe(
      {
        next: (dataRes: any) => {
          console.log('dataRes=======', dataRes);
          // this.spinner.show();
          // if (dataRes.status == 200) {

          // }
        },
        error: (error: any) => {
          // this.toastr.error(error.message, 'Error!');
        }
      }
    );
  }
}
