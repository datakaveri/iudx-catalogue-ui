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
      "city": "Bengaluru",
      "key": "bengaluru"
    },
    {
      "city": "Varanasi",
      "key": "varanasi"
    },
    {
      "city": "Pune",
      "key": "pune"
    },
    {
      "city": "Chandigarh",
      "key": "chandigarh"
    },
    {
      "city": "Vadodara",
      "key": "vadodara"
    },
    {
      "city": "Gaya",
      "key": "gaya"
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

  handleChange() {
    this._changeCity.get_api(this.baseUrl + this.query)
      .then((result) => this.results.push(result)
      )
  }


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