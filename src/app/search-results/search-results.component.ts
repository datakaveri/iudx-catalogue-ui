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
    'Provider 7',
    'Provider 8',
    'Provider 9',
    'Provider 10',
    'Provider 11',
  ];
  resource_groups = [
    'Resource Group 1',
    'Resource Group 2',
    'Resource Group 3',
    'Resource Group 4',
    'Resource Group 5',
    'Resource Group 6',
    'Resource Group 7',
    'Resource Group 8',
    'Resource Group 9',
    'Resource Group 10',
    'Resource Group 11',
    'Resource Group 12',
    'Resource Group 13',
    'Resource Group 14',
    'Resource Group 15',
  ];

  search_text: string;
  list_view: boolean;
  resourceGroupList: boolean;
  listMapBtn: boolean;
  step_pr_size: number;
  step_res_size: number;

  constructor(private router: Router) {
    this.listMapBtn = false;
    this.search_text = '';
    this.list_view = true;
    this.resourceGroupList = false;
    this.step_pr_size = 6;
    this.step_res_size = 6;
  }
  ngOnInit(): void {
    this.getRouter();
    this.getListOfProviders();
    this.getListOfResources();
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
  getListOfProviders() {
    //Api call to retrieve list of Providers
    return this.providers;
  }
  getListOfResources() {
    return this.resource_groups;
  }
  getRouter() {
    // console.log(this.router.url);
    if (
      this.router.url == '/search/items' ||
      this.router.url == '/search/map'
    ) {
      this.listMapBtn = true;
      this.resourceGroupList = true;
    }
  }
  toggle() {
    this.list_view = !this.list_view;
    if (this.list_view) {
      this.router.navigate(['/search/items']);
      this.resourceGroupList = true;
    } else {
      this.router.navigate(['/search/map']);
      this.resourceGroupList = true;
    }
  }
  showMoreResourceGrps() {
    this.step_res_size += this.step_res_size;
  }
  showMoreProviders() {
    this.step_pr_size += this.step_pr_size;
  }
}
