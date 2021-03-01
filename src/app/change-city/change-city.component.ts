import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss']
})
export class ChangeCityComponent implements OnInit {
  citiesData: any;
  text: { resource_groups: string; resource_items: string; providers: string; };
  constructor(private globalservice: GlobalService) { 
    this.citiesData = this.globalservice.get_cities();
    console.log(this.citiesData)
    this.text = this.globalservice.get_nomenclatures();
  }

  ngOnInit(): void {
  }
  change_city(city:any) {
    window.open('https://' + city.key + '.catalogue.iudx.org.in/','_self');
    window.sessionStorage.current_city_name= city.key;
  }

  close_popup(){
    this.globalservice.set_popup(false,'city-popup');
    this.globalservice.set_popup(true, 'menu');
  }
}
