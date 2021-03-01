import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { GlobalService } from './global.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  api_url: string;
  loader_subject = new Subject<any>();
  filter_subject = new Subject<any>();
  loader: Boolean = false;
  constructor(private http: HttpClient, private global: GlobalService) {
    this.api_url = environment.api_url;
   }
   set_loader(flag: Boolean) {
    this.loader_subject.next(flag);
  }

  get_loader(): Observable<any> {
    return this.loader_subject.asObservable();
  }

  set_filter(flag: Boolean) {
    this.filter_subject.next(flag);
  }

  get_filter(): Observable<any> {
    return this.filter_subject.asObservable();
  }


  get_city() {
    if(this.global.get_city()) return this.global.get_city().key;
    else return '';
  }
  get_api(route: string) {
    this.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.get(this.api_url + route + '?city=' + this.get_city()).subscribe(
        (data: any) => {
          this.set_loader(false);
          resolve(data);
        },
        (err) => {
          this.set_loader(false);
          if (err.status == 401) this.authorization_error_alert();
          else if (err.status == 400 || err.status == 404 || err.status == 403)
            this.technical_error_alert();
          else if (
            err.status == 500 ||
            err.status == 501 ||
            err.status == 502 ||
            err.status == 503 ||
            err.status == 504
          )
            this.server_error_alert();
          reject(err);
        }
      );
    });
  }
   post_api(route: string, body: { resource_groups: any[]; page: number; }) {
    this.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http
        .post(this.api_url + route + "?city=" + this.get_city(), body)
        .subscribe(
          (data: any) => {
            this.set_loader(false);
            resolve(data);
          },
          (err) => {
            this.set_loader(false);
            if (err.status == 401) this.authorization_error_alert();
            else if (
              err.status == 400 ||
              err.status == 404 ||
              err.status == 403
            )
              this.technical_error_alert();
            else if (
              err.status == 500 ||
              err.status == 501 ||
              err.status == 502 ||
              err.status == 503 ||
              err.status == 504
            )
              this.server_error_alert();
            reject(err);
          }
        );
    });
  }
  
  get_api_resource_server(route :any) {
    this.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.get(route).subscribe(
        (data: any) => {
          this.set_loader(false);
          resolve(data);
        },
        (err) => {
          this.set_loader(false);
          if (err.status == 401) this.authorization_error_alert();
          else if (err.status == 400 || err.status == 404 || err.status == 403)
            this.technical_error_alert();
          else if (
            err.status == 500 ||
            err.status == 501 ||
            err.status == 502 ||
            err.status == 503 ||
            err.status == 504
          )
            this.server_error_alert();
          reject(err);
        }
      );
    });
  }

  get_api_wl(route:any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.api_url + route + '?city=' + this.get_city()).subscribe(
        (data: any) => {
          resolve(data);
        },
        (err) => {
          if (err.status == 401) this.authorization_error_alert();
          else if (err.status == 400 || err.status == 404 || err.status == 403)
            this.technical_error_alert();
          else if (
            err.status == 500 ||
            err.status == 501 ||
            err.status == 502 ||
            err.status == 503 ||
            err.status == 504
          )
            this.server_error_alert();
          reject(err);
        }
      );
    });
  }


  authorization_error_alert() {
    //code to be filled later
  }

  technical_error_alert() {
    //code to be filled later
  }

  server_error_alert() {
    //code to be filled later
  }

}
