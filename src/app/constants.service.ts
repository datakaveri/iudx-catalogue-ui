import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  resource_groups: string;
  resource_items: string;
  providers: string;
  search_params: any;
  search_params_sub = new Subject<any>();
  city: any;
  cities: Array<any>;
  constructor(
    private title: Title
  ) {
    this.resource_groups = 'Dataset';
    this.resource_items = 'Resource';
    this.providers = 'Publisher';
    this.city = '';
    this.search_params = window.sessionStorage.search_params ? JSON.parse(window.sessionStorage.search_params) : {"text":"","tags":[],"providers":[],"page":0};
    let cities = [{"instanceID":"ui-test.iudx.org.in","configurations":{"smart_city_name":"PSCDCL","map_default_view_lat_lng":[18.5644,73.7858]}}];
    let host = location.host == 'localhost:4000' ? 'ui-test' : location.host.split('.')[0];
    cities.forEach(a=>{
      if(a.instanceID == (host + '.iudx.org.in')) this.city = a;
    });
    this.title.setTitle(this.city.configurations.smart_city_name + " Data Kaveri | Indian Urban Data Exchang");
  }

  set_city(value: any) {
    this.city = value;
  }

  get_city() {
    return this.city;
  }

  get_nomenclatures() {
    return {
      resource_groups: this.resource_groups,
      resource_items: this.resource_items,
      providers: this.providers,
    };
  }

  set_search_query(query) {
    this.search_params = query;
    window.sessionStorage.search_params = JSON.stringify(this.search_params);
  }

  get_search_query() {
    return this.search_params;
  }

  set_filter(query) {
    this.set_search_query(query);
    this.search_params_sub.next(this.search_params);
  }

  get_filter(): Observable<any> {
    return this.search_params_sub.asObservable();
  }
}
