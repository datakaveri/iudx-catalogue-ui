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

  results: any[] = [];
  result;
  queryField: FormControl = new FormControl();
  fadeIn: any;
  baseUrl: string = 'https://api.github.com/users/aakashsr';

  constructor(private _changeCity: InterceptorService) { }

  ngOnInit(): void {

  }

  handleChange() {
    this._changeCity.get_api(this.baseUrl)
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