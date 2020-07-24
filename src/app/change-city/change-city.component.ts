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

  overlayValue: boolean;
  results: any[] = [];
  query: string;
  // baseUrl: string = 'https://api.github.com/users/';

  constructor(private _changeCity: InterceptorService) { }

  ngOnInit(): void {

  }

  // handleChange() {
  //   this._changeCity.get_api(this.baseUrl + this.query)
  //     .then((result) => this.results.push(result)
  //     )
  // }

  @Output() showChangeCity = new EventEmitter();
  @Output() showOverlay = new EventEmitter();
  changeCityValue: boolean = true;

  changeValue() {
    // hiding the popup
    this.changeCityValue = false;
    // hiding overlay
    this.overlayValue = false;

    this.showChangeCity.emit(this.changeCityValue);
    this.showOverlay.emit(this.overlayValue);
  }
}