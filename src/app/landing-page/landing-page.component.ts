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
  coverImage: string;
  searchQuery: {};
  query: string ='';
  filteredTags: any = [];
  tags: any;
  city:any;
  tagSelected: any;
  summary: any;
  cities: any;
  cityCount: number;
  btnLess: boolean;
  cities1: boolean;
  cities2: boolean;
    
  constructor(private router:Router, private globalservice : GlobalService, private network: NetworkService) { 
    this.cities = this.globalservice.get_cities();
    // console.log(typeof(this.cities))
    this.cityCount = this.cities.length;
    this.cities1 = false;
    this.cities2 = true;
    this.btnLess = false;
    this.coverImage = '';
    this.globalservice.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.summary = {
      datasets: 0,
      resources: 0,
      publishers: 0
    };
    this.city = this.globalservice.get_city();
    // console.log(this.city);
    if (this.city) {
      setTimeout(() => {
        this.coverImage = this.city.cover;
      }, 100);
    }
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
 
  getSearchResultsByText(val: string) {
    if (val.trim() !== '') {
      this.searchQuery= {
        text: val,
        tags: [],
        providers: [],
        page: 0,
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
      providers: [],
      page: 0,
    };
    this.globalservice.set_search_query(this.searchQuery);
    this.router.navigate(['/datasets']);
  }
  filterItems(val:string) {
    const str = val.toLowerCase();
    this.filteredTags = this.tags.filter((e : any) => {
      return e.tag.toLowerCase().includes(str);
    });
  }
  
  openMenu() {
   this.globalservice.set_popup(true,'menu');
  }

  getAllDatasets(){
  //  console.log(this.searchQuery)
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
  showMore(){
    this.cities1 = true;
    this.cities2 = false;
    this.btnLess = true;
  }
  showLess(){
    this.cities2 = true;
    this.cities1 = false;
  }
}
