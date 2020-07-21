import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  providers = ['Provider 1', 'Provider 2', 'Provider 3', 'Provider 4'];
  listMapBtm = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.getRouter();
  }
  getResourceGroups(value) {
    console.log(value);
    // Api call here to search and get the results.
  }
  getRouter() {
    console.log(this.router.url);
    if (this.router.url == '/saerch/items') {
      this.listMapBtm = true;
    }
  }
}
