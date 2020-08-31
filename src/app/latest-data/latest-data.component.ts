import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-data',
  templateUrl: './latest-data.component.html',
  styleUrls: ['./latest-data.component.scss']
})
export class LatestDataComponent implements OnInit {

  latestData: any;
  overlay: boolean;
  showLatest:boolean;
  // lattesData:any;

  constructor(private router: Router) {

    this.showLatest = true;
    this.overlay = true;

    this.latestData = [
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

  hideLatestData(){
    if(this.router.url == '/search/map/latest-data'){
    this.router.navigate(['/search/map']);
    this.showLatest = false;
    this.overlay = false;
    }
    else{
    this.router.navigate(['../../search/dataset/items']);
    this.showLatest = false;
    this.overlay = false;
    }
  }
}
