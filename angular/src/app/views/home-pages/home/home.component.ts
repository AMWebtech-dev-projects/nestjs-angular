import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalService } from '../../../shared-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  title = 'Home | angular node training';

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
  }
}
