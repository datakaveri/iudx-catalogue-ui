import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-item-res-items',
  templateUrl: './item-res-items.component.html',
  styleUrls: ['./item-res-items.component.scss']
})
export class ItemResItemsComponent implements OnInit {
  resource: any;
  texts: any;
  resourceAuthControlLevel: string;
  showSample: boolean;
  sampleData: any;
  overlay: any;

  constructor(
    private constant: ConstantsService
  ) {
    this.resource = this.constant.get_resource_details();
    this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.texts = this.constant.get_nomenclatures();
    this.overlay = false;
    this.showSample = false;
    this.sampleData = [
      {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1
      }, {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1
      }, {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1
      }, {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1
      }
    ]
  }

  ngOnInit(): void {
  }

  showSampleData(){
    this.showSample = true;
    this.overlay = true;
    console.log(this.sampleData)
  }

  hideSampleData(){
    this.showSample = false;
    this.overlay = false;
  }

}
