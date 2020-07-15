import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  resource_groups: string;
  resource_items: string;
  providers: string;
  search_text: string;
  search_params: any;
  constructor() {
    this.resource_groups = 'Dataset';
    this.resource_items = 'Resource';
    this.providers = 'Publisher';
    this.search_params = {};
    this.search_text = '';
    this.search_params = window.sessionStorage.search_params ? JSON.parse(window.sessionStorage.search_params) : this.search_params;
    this.search_text = window.sessionStorage.search_text ? window.sessionStorage.search_text : this.search_params;
  }
  
  get_nomenclatures() {
    return {
      resource_groups: this.resource_groups,
      resource_items: this.resource_items,
      providers: this.providers
    }
  }

  set_search_query(query) {
    this.search_text = query.search_text;
    this.search_params = query.search_params;
    window.sessionStorage.search_text = query.search_text;
    window.sessionStorage.search_params = JSON.stringify(query.search_params);
  }

  get_search_query() {
    return {
      search_text: this.search_text,
      search_params: this.search_params
    }
  }

}
