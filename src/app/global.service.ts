import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  resource_groups: string;
  resource_items: string;
  resource_item: string='';
  map_cordinates: any;
  providers: string;
  search_params: any;
  search_params_sub = new Subject<any>();
  city: any;
  cities: any;
  resource: any;
  toast_subject = new Subject<any>();
  alert_subject = new Subject<any>();
  id: any;
  map_label: any;
  popup_subject = new Subject<any>();
  temp_object: any;
  type: any;
  resource_groups_list: any;
  tags: any;
  provider_rel: any;
  map_data: any;
  constructor() { 
    this.resource_groups = 'Dataset';
    this.resource_items = 'Resource';
    this.providers = 'Publisher';
    this.city = {};
    this.search_params = window.sessionStorage.search_params
      ? JSON.parse(window.sessionStorage.search_params)
      : { text: '', tags: [], providers: [], resource_groups: [] };
  }

  get_popup(): Observable<any> {
    return this.popup_subject.asObservable();
  }

  set_popup(flag: Boolean, type: string) {
    this.popup_subject.next({ flag: flag, type: type });
  }
  set_tags(val:any){
    this.tags = val;
  }

  get_tags(){
    return this.tags;
  }

  set_id_name_rel(val:any){
    this.provider_rel = val;
  }

  get_id_name_rel(){
    return this.provider_rel;
  }

  set_map_data(val:any){
    // console.log(val)
    this.map_data = val;
  }

  get_map_data(){
    return this.map_data;
  }
  get_temp_object() {
    return this.temp_object;
  }
  set_temp_object(value: any) {
    this.temp_object = value;
  }
  set_city(value: any) {
    this.city = value;
  }
  get_city() {
    return (this.city);
  }

  set_cities(value: any) {
    this.cities = value;
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

  set_search_query(query: any) {
    this.search_params = query;
    window.sessionStorage.search_params = JSON.stringify(this.search_params);
  }

  get_search_query() {
    return this.search_params;
  }

  set_filter(query: any) {
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
  set_filter_rsg(value:any){
    this.resource_groups_list = value;
  }
  get_filter_rsg(){
    return this.resource_groups_list;
  }

  set_resource_item(value: any) {
    this.resource_item = value;
  }

  get_resource_item() {
    return this.resource_item;
  }
  set_map_coordinates(id: any,label: any) {
    this.map_cordinates = [id,label];
  }
  get_map_coordinates() {
    return this.map_cordinates;
  }
  set_item_id(id: any) {
    this.id = id;
  }
  get_item_id() {
    return this.id;
  }
  set_data_type(type:any){
    this.type = type;
  }
  get_data_type(){
    return this.type;
  }
  set_alert(obj: any) {
    this.alert_subject.next(obj);
  }

  get_alert(): Observable<any> {
    return this.alert_subject.asObservable();
  }

  set_toaster(type: any, message: any) {
    this.toast_subject.next({ type: type, message: message });
  }

  get_toaster(): Observable<any> {
    return this.toast_subject.asObservable();
  }

}
