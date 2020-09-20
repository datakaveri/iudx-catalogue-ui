import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

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
  item_id: string;

  constructor(
    private router: Router,
    private location: Location,
    private constantService : ConstantsService,
    private interceptorService:InterceptorService
  ) {

    this.showLatest = true;
    this.overlay = true;
    this.item_id = this.constantService.get_item_id();
    // console.log(this.item_id);
    this.getLatestData(this.item_id);
    }

  ngOnInit(): void {
   
  }

  hideLatestData(){
    this.location.back();
  }
  getLatestData(id:string){
     this.interceptorService.get_api_resource_server('https://rs.iudx.io/ngsi-ld/v1/entities/iisc.ac.in/89a36273d77dac4cf38114fca1bbe64392547f86/rs.iudx.io/surat-itms-realtime-information/surat-itms-live-eta').then((data)=>{
      // this.interceptorService.get_api_resource_server('https://rs.iudx.io/ngsi-ld/v1/entities/'+id).then((data)=>{  
      // console.log(data);
      this.latestData = data;
    })
  }
}
