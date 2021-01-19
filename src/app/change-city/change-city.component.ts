import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InterceptorService } from '../interceptor.service';
import { ConstantsService } from '../constants.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss']
})
export class ChangeCityComponent implements OnInit {
  citiesData: any;
  overlayValue: boolean;
  results: any[] = [];
  query: string;
  text: any;
  constructor(
    private global: ConstantsService,
    private network: InterceptorService,
    private location: Location
  ) {
    this.citiesData = this.global.get_cities();
    this.text = this.global.get_nomenclatures();
  }

  ngOnInit(): void {

  }
  
  change_city(data) {
    window.open('https://' + data.key + '.catalogue.iudx.org.in/','_self');
  }

  @Output() showChangeCity = new EventEmitter();
  @Output() showOverlay = new EventEmitter();
  changeCityValue: boolean = true;

  close() {
    this.changeCityValue = false;
    this.overlayValue = false;
    this.showChangeCity.emit(this.changeCityValue);
    this.showOverlay.emit(this.overlayValue);
  }

}