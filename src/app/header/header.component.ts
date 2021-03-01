import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  popup_status:boolean = false;
  popup_type: string = '';
  geo_query: boolean = true;
  router_url: string;
  names: any = {};
  tags: any;
  tagSelected: any;
  filteredTags: any = [];
  searchQuery: {};
  query: string='';
  city: any;
  constructor(private router:Router, private globalservice : GlobalService, private network:NetworkService) {
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
    this.router_url = this.router.url;
    this.names = this.globalservice.get_nomenclatures();
    this.city = this.globalservice.get_city();
    // console.log(this.city);
    this.get_tags();
   }

  ngOnInit(): void {
  }
  openMenu() {
    this.globalservice.set_popup(true,'menu');
   }
   OpenGeoQuery(){
     this.router.navigate(['/geo-query']);
     
   }
   get_tags() {
    this.network.get_api_wl('customer/tags').then((data) => {
      this.tags = data;
    });
  }
  filterItems(val :string) {
    let str = val.toLowerCase();
    this.filteredTags = this.tags.filter((e:any) => {
      return e.tag.toLowerCase().includes(str);
    });
  }
  getSearchResultsByText(text: string) {
    console.log(text);
    if (text.trim() !== '') {
      this.searchQuery = {
        text: text,
        tags: [],
        providers: [],
        page: 0,
      };
      this.globalservice.set_filter(this.searchQuery);
      this.router.navigate(['/datasets']);
      this.query = '';
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
    this.globalservice.set_filter(this.searchQuery);
    this.router.navigate(['/datasets']);
    this.query = '';
  } 
}
