import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  search_text: string;

  constructor(
    public router: Router,
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.search_text = '';
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
