import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  search_text: string;
  // showFilterBtn: boolean;
  // list_view: boolean;
  // resourceGroupList: boolean;
  // listMapBtn: boolean;

  constructor(
    public router: Router,
    private constantService: ConstantsService
  ) {
    // this.listMapBtn = false;
    this.search_text = '';
    // this.showFilterBtn = false;
    // this.list_view = true;
    // this.resourceGroupList = false;
  }
  ngOnInit(): void {}
  getResourceGroups(value) {
    console.log(value);
    // Api call here to search and get the results.
  }
  getDataForProviders(event, value) {
    // ToDo
  }
  getDataForResourceGroups(event, value) {
    // ToDo
  }
  showBtnFilter() {
    if (
      this.router.url == '/search/map' ||
      this.router.url == '/search/datasets'
    )
      return true;
  }
  showMap() {
    this.router.navigate(['/search/map']);
  }

  showFilter(flag) {
    console.log('filter open');
    this.constantService.set_filter(flag);
  }
  listView() {
    this.router.navigate(['/search/datasets']);
  }
}
