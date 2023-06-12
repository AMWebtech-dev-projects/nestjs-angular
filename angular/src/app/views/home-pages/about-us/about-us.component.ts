import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared-ui';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  title = 'About Us | angular node training';
  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
  }
}
