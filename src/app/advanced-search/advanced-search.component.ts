import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  // fadeIn: any;
  advanceSearchValue: boolean = true;
  overlayValue: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  @Output() showAdvanceSearch = new EventEmitter();
  @Output() showOverlay = new EventEmitter();

  changeValue() {
    // hide advance search popup
    this.advanceSearchValue = false;
    // hide overlay
    this.overlayValue = false;

    this.showAdvanceSearch.emit(this.advanceSearchValue);
    this.showOverlay.emit(this.overlayValue);
  }
}
