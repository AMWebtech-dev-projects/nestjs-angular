import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
declare var $: any;
import {
  currentUser,
  GlobalService,
  JwtService,
  UsersService,
} from '../../shared-ui';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  subscription: Subscription = new Subscription();
  currentUser: currentUser = new currentUser();
  showNav: boolean = false;
  fixedHeader: boolean = true;
  showScroll: boolean = true;
  loadingListings: boolean = false;
  showScrollHeight = 100;
  hideScrollHeight = 10;
  addClassActiveUser: boolean = false;
  @ViewChild('quickSearchOverlayWrap', { static: false })
  public quickSearchOverlayWrap!: ModalDirective;
  quickSearchList: any[] = [];
  quickSearch: any = {
    searchText: '',
  };

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService
  ) {
    this.subscription = this.globalService
      .getActionChildToParent()
      .subscribe((message) => {
        if (message) {
          this.currentUser = this.jwtService.getCurrentUser();
          if (this.currentUser && this.currentUser._id) {
            this.addClassActiveUser = true;
          } else {
            this.addClassActiveUser = false;
          }
        }
      });
  }

  ngOnInit(): void {
    this.currentUser = this.jwtService.getCurrentUser();
    if (this.currentUser && this.currentUser._id) {
      this.addClassActiveUser = true;
    } else {
      this.addClassActiveUser = false;
    }
  }

  toggleNavbar() {
    this.showNav = !this.showNav;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showScroll = true;
      this.fixedHeader = true;
    } else if (
      this.showScroll &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScroll = false;
      this.fixedHeader = false;
    }
  }

  scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 600);
  }

  logout() {
    this.jwtService.destroyToken();
    this.globalService.logOut();
    this.router.navigate(['/login']);
    this.toastr.success('You have logged out successfully.', 'Success');
    this.addClassActiveUser = false;
  }

  getSearchdata(searchData: string) {
    this.spinner.show();
    let validString = searchData.replace(/\s/g, ''); //remove space from string
    if (validString) {
      this.usersService.searchUserData({ quickSearch: searchData }).subscribe(
        {
          next: (data) => {
            if (data.status == 200) {
              this.spinner.hide();
              this.quickSearchList = data.data;
            } else {
              this.spinner.hide();
              this.quickSearchList = [{ error: 'No Data Found' }];
            }
          },
          error: (error) => {
            this.spinner.hide();
          }
        }
      );
    } else {
      this.quickSearchList = [];
      this.toastr.warning('Please Enter User Name.', 'warning');
      this.spinner.hide();
    }
  }
}
