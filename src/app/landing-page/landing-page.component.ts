import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showAdvanceSearch: boolean = false;
  overlay: boolean = false;
  names: any = {};
  query: string;
  results: any[] = [];
  baseUrl: string = "http://3.7.179.184:3000/v1/customer/cities?city=pune";


  data = {
    resource_groups: 274,
    resource_items: 783,
    api_calls: 2412,
    providers: 17
  }

  constructor(private _search: InterceptorService) {
    this.showAdvanceSearch = false;
    this.overlay = false;
    this.names = new ConstantsService();
  }

  ngOnInit(): void {
  }

  handleChange() {
    this._search.get_api(this.baseUrl)
      .then((result) => console.log(result)
      
      ).catch(e => {
        console.log(e);
    });
  }



  goToAdvanceSearch() {
    // showing the overlay
    this.overlay = true;
    // showing the advanceSearch popup
    this.showAdvanceSearch = true;
  }

  // getAdvanceSearch(value) {
  //   this.showAdvanceSearch = value;
  // }

  getOverlay(value) {
    this.overlay = value;
  }
}
