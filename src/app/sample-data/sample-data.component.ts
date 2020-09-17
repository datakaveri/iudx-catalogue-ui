import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ConstantsService } from '../constants.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss']
})
export class SampleDataComponent implements OnInit {
  resource:any;
  sampleData: any;
  overlay: boolean;
  showSample:boolean;
  
  constructor(
    private constant: ConstantsService,
    private router: Router,
    private location: Location
  ) {
    this.resource = this.constant.get_resource_details();
    // this.sampleData = this.resource.resource_group.dataSample;
    this.showSample = true;
    this.overlay = true;
    this.sampleData = this.constant.get_resource_item();
  }

  ngOnInit(): void {
  }

  hideSampleData(){
    this.location.back();
  }
}
