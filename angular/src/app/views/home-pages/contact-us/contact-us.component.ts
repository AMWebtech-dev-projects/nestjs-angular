import { GlobalService } from '../../../shared-ui/services/global.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { } from 'googlemaps';

interface marker {
  lat: number;
  lng: number;
  label: string;
  draggable: boolean;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactUsComponent implements OnInit {
  title = 'Contact Us | angular node training';
  required: any = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  // google maps zoom level
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  // map.updateSize()
  constructor(
    private globalService: GlobalService
  ) { }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true,
    },
  ];

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
  }
  clickedMarker() { }
}
