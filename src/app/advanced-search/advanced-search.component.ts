import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  fadeIn: any;
  advanceSearchValue: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  @Output() showAdvanceSearch = new EventEmitter();

  changeValue() {
    this.advanceSearchValue = false;

    this.fadeIn = document.querySelector('.fadeIn')
    // hiding the fadein bg
    this.fadeIn.style.opacity = 0;
    this.fadeIn.style.visibility = 'hidden';

    this.showAdvanceSearch.emit(this.advanceSearchValue);
  }
}
