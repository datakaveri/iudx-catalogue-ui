import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  popup_status:boolean = false;
  popup_type: string = '';
  searchQuery: {};
  query: string ='';
  filteredTags: any = [];
  tags: any;
  city:any;
  tagSelected: any;
  summary: any;
  cities: any;
  shown_cities: any;
  collapsed: Boolean;
  constructor(private router:Router, private globalservice : GlobalService, private network: NetworkService) { 
    this.cities = this.globalservice.get_cities();
    this.collapsed = true;
    this.shown_cities = this.cities.slice(0,8);
    this.globalservice.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
    this.searchQuery = {
      text: '',
      tags: [],
      providers: []
    };
    this.summary = {
      datasets: 0,
      resources: 0,
      publishers: 0
    };
    this.city = this.globalservice.get_city();
    this.getSummary();
    this.tags = this.globalservice.get_tags();
  }

  ngOnInit(): void {
  }

  getSummary(){
    this.network.get_api('customer/summary').then((data) => {
      this.summary = data;
    });
  }

  get_number() {
    if(this.collapsed) return 8;
    else return this.cities.length;
  }
 
  getSearchResultsByText(val: string) {
    if (val.trim() !== '') {
      this.searchQuery= {
        text: val,
        tags: [],
        providers: []
      };
      this.globalservice.set_search_query(this.searchQuery);
      this.router.navigate(['/datasets']);
    }
  }
  getSearchResultsByTag(value: any) {
    this.tagSelected = value;
    this.searchQuery = {
      text: '',
      tags: [this.tagSelected],
      providers: []
    };
    this.globalservice.set_search_query(this.searchQuery);
    this.router.navigate(['/datasets']);
  }
  filterItems(val:string) {
    console.log(val);
    const str = val.toLowerCase();
    this.filteredTags = this.tags.filter((e : any) => {
      return e.toLowerCase().includes(str);
    });
  }
  
  openMenu() {
   this.globalservice.set_popup(true,'menu');
  }

  getAllDatasets(){
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.globalservice.set_search_query(this.searchQuery);
    this.router.navigate(['/datasets']);
  }

  getGeoInfo(){
    this.router.navigate(['/geo-query']);
  }
  getImage(){
    if (this.city) {
      return  `linear-gradient(rgba(68, 68, 68, 0.75), rgba(68, 68, 68, 0.75)),url(${this.city.cover})`;
    } else {
     return `linear-gradient(rgba(68, 68, 68, 0.4), rgba(68, 68, 68, 0.6)), url('assets/landingpagebg.jpeg')`;
    }
  }
  go_to_city(city : any) {
    window.open('https://' + city.key + '.catalogue.iudx.org.in', '_self');
  }
  toggle() {
    this.collapsed = !this.collapsed;
    if(this.collapsed) {
      this.shown_cities = this.cities.slice(0,8);
    } else {
      this.shown_cities = this.cities;
    }
  }
}
