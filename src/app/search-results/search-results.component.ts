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
  searchQuery: {};

  constructor(
    public router: Router,
    private constantService: ConstantsService
  ) {
    this.search_text = '';
    this.searchQuery = {
      search_text: '',
      search_params: {
        tags: [],
        providers: [],
        page: 0,
        resource_groups: [],
      },
    };
  }
  ngOnInit(): void {}
  getResourceGroups(value) {
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
    this.constantService.set_filter(flag);
  }
  listView() {
    this.router.navigate(['/search/datasets']);
  }
  getSearchDatasets(text: string) {
    // console.log(text);
    this.searchQuery = {
      search_text: text,
      search_params: {
        tags: [],
        providers: [],
        page: 0,
        resource_groups: [],
      },
    };
    this.constantService.set_search_query(this.searchQuery);
    this.router.navigate(['search/datasets']);
  }
}
