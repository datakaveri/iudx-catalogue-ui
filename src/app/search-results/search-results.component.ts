import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  providers = [
    'Provider 1',
    'Provider 2',
    'Provider 3',
    'Provider 4',
    'Provider 5',
    'Provider 6',
  ];
  resource_groups = [
    'Resource Group 1',
    'Resource Group 2',
    'Resource Group 3',
    'Resource Group 4',
    'Resource Group 5',
    'Resource Group 6',
  ];
  listMapBtn: boolean;
  resourceGroupList: boolean;
  isList: any;

  constructor(private router: Router) {
    this.listMapBtn = false;
    this.resourceGroupList = false;
    this.isList = true;
  }
  ngOnInit(): void {
    this.getRouter();
  }
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
  getRouter() {
    console.log(this.router.url);
    if (
      this.router.url == '/search/items' ||
      this.router.url == '/search/map'
    ) {
      this.listMapBtn = true;
      this.resourceGroupList = true;
    }
  }
  toggle() {
    this.isList = !this.isList;
    if (this.isList) {
      this.router.navigate(['/search/items']);
      this.resourceGroupList = true;
    } else {
      this.router.navigate(['/search/map']);
      this.resourceGroupList = true;
    }
  }
}
