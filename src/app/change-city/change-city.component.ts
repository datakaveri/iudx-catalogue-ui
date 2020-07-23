import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss']
})
export class ChangeCityComponent implements OnInit {

  citiesData = [
    {
      city: "Bengaluru",
      key: "bengaluru",
      resource_count: 122
    },
    {
      city: "Varanasi",
      key: "varanasi",
      resource_count: 544
    },
    {
      city: "Pune",
      key: "pune",
      resource_count: 123
    },
    {
      city: "Chandigarh",
      key: "chandigarh",
      resource_count: 12
    },
    {
      city: "Vadodara",
      key: "vadodara",
      resource_count: 233
    },
    {
      city: "Gaya",
      key: "gaya",
      resource_count: 46
    }

  ]

  results: any[] = [];
  query: string;
  result;
  queryField: FormControl = new FormControl();
  fadeIn: any;
  baseUrl: string = 'https://api.github.com/users/';

  constructor(private _changeCity: InterceptorService) { }

  ngOnInit(): void {

  }

  // handleChange() {
  //   this._changeCity.get_api(this.baseUrl + this.query)
  //     .then((result) => this.results.push(result)
  //     )
  // }


  @Output() showChangeCity = new EventEmitter();
  changeCityValue: boolean = true;

  changeValue() {

    // hiding the popup
    this.changeCityValue = false;


    this.fadeIn = document.querySelector('.fadeIn')
    // hiding the fadein bg
    this.fadeIn.style.opacity = 0;
    this.fadeIn.style.visibility = 'hidden';

    // passing the changeCityValue back to footer
    this.showChangeCity.emit(this.changeCityValue);
  }
}