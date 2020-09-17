import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
  resource: any;
  toast_subject = new Subject<any>();
  alert_subject = new Subject<any>();
  constructor( ) {
    this.resource_groups = 'Dataset';
    this.resource_items = 'Resource';
    this.providers = 'Publisher';
    this.city = '';
    this.search_params = window.sessionStorage.search_params ? JSON.parse(window.sessionStorage.search_params) : {"text":"","tags":[],"providers":[],"page":0,"resource_groups":[]};
  }

  set_city(value: any) {
    this.city = value;
  }

  set_cities(value: any) {
    this.cities = value;
  }

  get_city() {
    return this.city;
  }

  get_cities() {
    return this.cities;
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

  set_resource_details(value: any) {
    this.resource = value;
  }

  get_resource_details() {
    return this.resource;
  }

  set_alert(obj) {
    this.alert_subject.next(obj);
  }

  get_alert(): Observable<any> {
    return this.alert_subject.asObservable();
  }

  set_toaster(type,message) {
    this.toast_subject.next({type:type,message:message});
  }

  get_toaster(): Observable<any> {
    return this.toast_subject.asObservable();
  }

}