import { Component } from '@angular/core';
import { InterceptorService } from './interceptor.service';
import { ConstantsService } from './constants.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader: Boolean;
  toast_props: any;
  show_toast: Boolean;
  alert_props: any;
  show_alert: Boolean;
  cities_loaded: Boolean;
  constructor(
    private title: Title,
    private network: InterceptorService,
    private global: ConstantsService
  ) {
    this.cities_loaded = false;
    this.get_cities();
    this.loader = false;
    this.show_toast = false;
    this.show_alert = false;
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
      let cities = data, city;
      let host = location.host == 'localhost:4000' ? 'pune' : location.host.split('.')[0];
      if(host != '' && host != 'catalogue') {
        cities.forEach(a=>{
          if(a.key == host) city = a;
        });
        this.title.setTitle(city.name + " Data Kaveri | Indian Urban Data Exchange");
      } else {
        this.title.setTitle("Data Kaveri | Indian Urban Data Exchange");
      }
      this.global.set_city(city);
      this.global.set_cities(cities);
      this.cities_loaded = true;
    });
  }
}
