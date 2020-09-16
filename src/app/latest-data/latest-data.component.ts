import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-latest-data',
  templateUrl: './latest-data.component.html',
  styleUrls: ['./latest-data.component.scss']
})
export class LatestDataComponent implements OnInit {

  latestData: any;
  overlay: boolean;
  showLatest:boolean;
  res: string;

  constructor(
    private router: Router,
    private location: Location
  ) {

    this.showLatest = true;
    this.overlay = true;

     this.latestData = 

    //  [{"@context":"https://voc.iudx.org.in/","type":["iudx:ResourceGroup"],"id":"providerID/example.com/senosrs","description":"Description of this resource group","name":"sensors","tags":"sensor, sensing, resource, battery operated","itemStatus":"ACTIVE","provider":"providerID","resourceServer":"resourceProviderID/exapmle.com","resourceAuthControlLevel":"INDIVIDUAL","resourceType":"messageStream","authServerInfo":{"type":["AuthServerInfoValue"],"authServerURL":"https://myauth.server.org/","authType":"iudx-auth"},"accessObjectInfo":{"type":["AccessObjectInfoValue"],"accessObject":"https://example.com/sensorsApis.json","additionalInfoURL":"https://example.com/sensorsApis","accessObjectType":"openAPI"},"iudxResourceAPIs":["attribute","temporal"],"itemCreatedAt":"2019-02-20T10:30:06.093121","location":{"type":"Place","address":"Bangalore"}}]
     [
      {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1
      }, 
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
      }
    ]
   }

  ngOnInit(): void {
  }

  hideLatestData(){
    this.location.back();
  }
}
