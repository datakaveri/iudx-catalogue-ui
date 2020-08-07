import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  api_url: string;
  subject = new Subject<any>();
  loader: Boolean;
  city: string;
  constructor(
    private http: HttpClient,
    private router:Router,
    private constant: ConstantsService
  ) {
    this.api_url = environment.api_url;
  }

  set_loader(flag: Boolean) {
    this.subject.next(flag);
  }
  
  get_loader(): Observable<any> {
    return this.subject.asObservable();
  }
  
  get_api(route) {
    this.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.get(this.api_url + route + '?city=' + this.constant.get_city()).subscribe((data: any) => {
        this.set_loader(false);
        resolve(data);
      }, (err) => {
        this.set_loader(false);
        if (err.status == 401) this.authorization_error_alert();
        else if (err.status == 400 || err.status == 404 || err.status == 403) this.technical_error_alert(err);
        else if (err.status == 500 || err.status == 501 || err.status == 502 || err.status == 503 || err.status == 504) this.server_error_alert();
        reject(err);
      });
    });
  }

  post_api(route, body) {
    this.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.post(this.api_url + route + '?city=' + this.constant.get_city(), body).subscribe((data: any) => {
        this.set_loader(false);
        resolve(data);
      }, (err) => {
        this.set_loader(false);
        if (err.status == 401) this.authorization_error_alert();
        else if (err.status == 400 || err.status == 404 || err.status == 403) this.technical_error_alert(err);
        else if (err.status == 500 || err.status == 501 || err.status == 502 || err.status == 503 || err.status == 504) this.server_error_alert();
        reject(err);
      });
    });
  }

  get_api_wl(route) {
    return new Promise((resolve, reject) => {
      this.http.get(this.api_url + route + '?city=' + this.constant.get_city()).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        if (err.status == 401) this.authorization_error_alert();
        else if (err.status == 400 || err.status == 404 || err.status == 403) this.technical_error_alert(err);
        else if (err.status == 500 || err.status == 501 || err.status == 502 || err.status == 503 || err.status == 504) this.server_error_alert();
        reject(err);
      });
    });
  }

  authorization_error_alert() {
    //code to be filled later
  }

  technical_error_alert(err) {
    //code to be filled later
  }

  server_error_alert() {
    //code to be filled later
  }
  
}