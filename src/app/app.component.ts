import { Component } from '@angular/core';
import { NetworkService } from './network.service';
import { GlobalService } from './global.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  popup_status: Boolean;
  popup_type: string;
  loader: Boolean;
  toast_props: any;
  show_toast: Boolean;
  alert_props: any;
  show_alert: Boolean;
  cities_loaded: Boolean=false;
  constructor(
    private title: Title,
    private network: NetworkService,
    private global: GlobalService
  ) {
    this.get_cities();
    this.loader = false;
    this.show_toast = false;
    this.show_alert = false;
    this.popup_status = false;
    this.popup_type = '';
    this.global.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
    this.network.get_loader().subscribe(flag => {
      this.loader = flag;
    });
    this.global.get_toaster().subscribe(data => {
      this.toast_props = data;
      this.show_toast = true;
      setTimeout(()=>{
        this.show_toast = false;
      }, 2000);
    });
    this.global.get_alert().subscribe(data => {
      this.alert_props = data;
      this.show_alert = data.flag;
    });
  }

  get_cities() {
    this.network.get_api('customer/cities')
    .then((data: any)=>{
      let cities = data;
      let city : any;
      let host = location.host == 'localhost:4200' ? 'pune' : location.host.split('.')[0];
      if(host != '' && host != 'catalogue' && host != 'stgcatalogue') {
        cities.forEach((a: any)=>{
          if(a.key == host) city = a;
        });
        // console.log(city)
        this.title.setTitle(city.name + " IUDX | India Urban Data Exchange");
      } else {
        this.title.setTitle("IUDX | India Urban Data Exchange");
      }
      // console.log(city);
      this.global.set_city(city);
      this.global.set_cities(cities);
      this.cities_loaded = true;
    });
  }

}
