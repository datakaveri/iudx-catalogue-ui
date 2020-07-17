import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss']
})
export class ChangeCityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() showChangeCity = new EventEmitter();
  changeCityValue: boolean = true;

  changeValue() {
    this.changeCityValue = false;
    this.showChangeCity.emit(this.changeCityValue);
  }
}