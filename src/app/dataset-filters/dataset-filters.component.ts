import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-dataset-filters',
  templateUrl: './dataset-filters.component.html',
  styleUrls: ['./dataset-filters.component.scss']
})
export class DatasetFiltersComponent implements OnInit {
  data: any = '';
  search: any;
  selectedTags: any = [];
  tags: any;
  providers: any;
  filtered_providers: any = [];
  filtered_tags: any = [];
  searchQuery: any;
  selectedProviders: any = [];
  constructor(private globalservice: GlobalService, private network: NetworkService) { 
    this.searchQuery = this.globalservice.get_search_query();
    this.tags = JSON.parse(sessionStorage.getItem('tags') || '{}');
    this.providers = JSON.parse(sessionStorage.getItem('providers') || '{}');
    this.search = {
      tag: '',
      provider: '',
    };
    this.get_filters();
  }

  ngOnInit(): void {
  }
  get_filters() {
    this.filtered_tags = this.tags;
    this.tags.forEach((a : any) => {
      if (this.searchQuery.tags.includes(a.tag)) a.flag = true;
      else a.flag = false;
    });
    this.filtered_providers = this.providers;
    this.providers.forEach((a :any) => {
      if (this.searchQuery.providers.includes(a.id)) a.flag = true;
      else a.flag = false;
    });
  }
  toggle_tag(tag:any) {
    this.tags.forEach((a:any, i:any) => {
      if (a.tag == tag) this.tags[i].flag = !this.tags[i].flag;
    });
  }
  toggle_provider(id:any) {
    this.providers.forEach((a:any, i:any) => {
      if (a.id == id) this.providers[i].flag = !this.providers[i].flag;
    });
  }
  find_tag_status(tag:any) {
    let flag = false;
    this.tags.forEach((a:any) => {
      if (a.tag == tag && a.flag == true) flag = true;
    });
    return flag;
  }

  find_provider_status(id:any) {
    let flag = false;
    this.providers.forEach((a:any) => {
      if (a.id == id && a.flag == true) flag = true;
    });
    return flag;
  }
  filter_by_tag() {
    let str = this.search.tag.toLowerCase();
    this.filtered_tags = this.tags.filter((e :any) => {
      return e.tag.toLowerCase().includes(str);
    });
  }

  filter_by_provider() {
    let str = this.search.provider.toLowerCase();
    this.filtered_providers = this.providers.filter((e : any) => {
      return e.name.toLowerCase().includes(str);
    });
  }
  
  apply_filter() {
    // console.log(this.searchQuery);
    let tags = this.tags
    .filter((a:any) => {
      return a.flag == true;
    })
    .map((a:any) => {
      return (a = a.tag);
    });
  let providers = this.providers
    .filter((a:any) => {
      return a.flag == true;
    })
    .map((a:any) => {
      return (a = a.id);
    });
    this.searchQuery.tags = tags;
    this.searchQuery.providers = providers;
    this.globalservice.set_search_query(this.searchQuery);
    this.close_filter();
  }
  clear() {
    this.tags.forEach((a:any) => {
      a.flag = false;
    });
    this.providers.forEach((a:any) => {
      a.flag = false;
    });
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.search = {
      tag: '',
      provider: '',
    };
    this.globalservice.set_search_query(this.searchQuery);
    this.close_filter();
  }
  close_filter(){
    this.globalservice.set_popup(false,'dataset-filter');
  }
}
