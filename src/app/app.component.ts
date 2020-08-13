import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ConstantsService } from './constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private title: Title,
    private constant: ConstantsService
  ) {
    let cities = [{"instanceID":"ui-test.iudx.org.in","configurations":{"smart_city_name":"PSCDCL","map_default_view_lat_lng":[18.5644,73.7858]}}];
    let host = location.host == 'localhost:4000' ? 'ui-test' : location.host.split('.')[0];
    let city;
    cities.forEach(a=>{
      if(a.instanceID == (host + '.iudx.org.in')) city = a;
    });
    this.title.setTitle(city.configurations.smart_city_name + " Data Kaveri | Indian Urban Data Exchang");
    this.constant.set_city(city);
  }
}