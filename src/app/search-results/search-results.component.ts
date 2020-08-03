import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  search_text: string;
  // list_view: boolean;
  // resourceGroupList: boolean;
  // listMapBtn: boolean;

  constructor(private router: Router) {
    // this.listMapBtn = false;
    this.search_text = '';
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

  showMap() {
    this.router.navigate(['/search/map']);
  }

  // openFilter() {
  //   var showFilter: boolean;
  //   showFilter = true;
  // }
}

// export function openFilter() {}
