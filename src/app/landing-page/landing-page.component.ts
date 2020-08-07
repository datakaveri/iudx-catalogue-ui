import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  showAdvanceSearch: boolean = false;
  overlay: boolean = false;
  names: any = {};
  query: string;
  resultData: any;
  categoriesData: any[] = [];
  showDropdown:boolean = false;
  results:any;
  body:any;

  tags = ["Dead animal", "Debris Removal", "Garbage dump", "Open Manholes Or Drains", "Sewerage or Storm Water Overflow", "Sweeping not done", "absent", "air", "air quality", "amenities", "amrut", "aqi", "aqm", "area", "asphalt", "attendance", "boundary", "bridges", "census", "civic", "clear water", "climate", "climo", "co", "co2", "collection", "colony", "complaints", "concrete", "deity", "discharge", "dump", "dustbin", "dustbins", "employee", "environment", "fleet", "flyover", "garbage", "gardens", "gcp", "ghar", "gis", "grievances", "ground control point", "humidity", "inventory", "kooda", "kunds", "land", "landmarks", "landuse", "light", "list", "lux", "management", "manhole", "mohallah", "municipal", "no", "no2", "noise", "o3", "oht", "overhead", "ozone", "parks", "pipe line", "pm10", "pm2.5", "pm25", "pollution", "polygon", "ponds", "population", "present", "property", "railline", "railwayline", "railways", "raw water", "religious", "rivers", "road", "sewer", "sewer treatment plant", "sewerline", "signal post", "single", "so2", "solid", "streetlight", "structure", "swachhata", "swm", "tanks", "tax", "tax zone", "temperature", "tiles", "total", "traffic signal", "treatment", "truck", "trucks", "tubewells", "uv", "valve", "vehicle", "vehicles", "ward", "waste", "wastebin", "water", "water atm", "water pump station", "water reservoir", "water station", "water supply", "water treatment plant", "wells", "wise", "workers", "zone"]



  constructor(public router: Router, private _search: InterceptorService) {
    this.showAdvanceSearch = false;
    this.overlay = false;
    this.names = new ConstantsService();
    this.body = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
  }

  ngOnInit(): void {
    this._search
      .get_api('customer/summary?city=pune')
      .then((data) => {
        this.resultData = data;
        this.categoriesData = this.resultData.categories;
      }
      ).catch(e => {
        console.log(e);
      });
  }

  handleChange() {
    this._search.get_api('customer/tags?tag=Dead animal')
      .then((result) => {
        this.results = result;
        console.log(result);
        
      }
      ).catch(e => {
        console.log(e);
      });
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
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
  getSearchResults(text: string) {
    console.log(text);
    this.router.navigate(['/search/datasets'], { queryParams: { term: text } });
    this._search.post_api('customer/search', this.body).then((response) => {
      console.log(response);
    });
  }
}
