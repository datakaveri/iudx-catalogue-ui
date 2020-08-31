import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss']
})
export class SampleDataComponent implements OnInit {
  sampleData: any;
  overlay: boolean;
  showSample:boolean;
  
  constructor(private router: Router) {

    this.showSample = true;
    this.overlay = true;
    this.sampleData = [
      {
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

  hideSampleData(){
    this.router.navigate(['../search/datasets/']);
    this.showSample = false;
    this.overlay = false;
  }
}
