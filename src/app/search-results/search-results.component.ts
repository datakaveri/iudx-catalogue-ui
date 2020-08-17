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
  names: any = {};
  tags: any;
  tagSelected: any;
  filteredTags: any = [];
  resultData: any;
  searchQuery: {};
  query: string;
  showDropDown: any;

  constructor(
    public router: Router,
    private network: InterceptorService,
    private constantService: ConstantsService
  ) {
    this.showDropDown = false;
    this.query = '';
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

    this.names = this.constantService.get_nomenclatures();

    this.get_data();
    this.get_tags();
  }
  ngOnInit(): void { }
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
    // this.constantService.set_filter(flag);
  }
  listView() {
    this.router.navigate(['/search/datasets']);
  }
  getSearchDatasets(text: string) {
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

  get_data() {
    this.network.get_api('customer/summary').then((data) => {
      this.resultData = data;
    });
  }


  get_tags() {
    this.network.get_api('customer/tags').then((data) => {
      this.tags = data;
    });
  }

  filterItems(word) {
    this.filteredTags = this.tags.filter((e) => {
      return e.tag.toLowerCase().includes(word);
    });
    if (this.query != '') {
      this.showDropDown = true;
    } else {
      this.showDropDown = false;
    }
  }

  getSearchResultsByText(text: string) {
    if (text.trim() !== '') {
      this.searchQuery = {
        text: text,
        tags: [],
        providers: [],
        page: 0,
      };
      this.constantService.set_filter(this.searchQuery);
      this.router.navigate(['/search/datasets']);
    }
    this.showDropDown = false;
  }

  getSearchResultsByTag(value) {
    this.tagSelected = value;
    this.searchQuery = {
      text: '',
      tags: [this.tagSelected],
      providers: [],
      page: 0,
    };
    this.constantService.set_filter(this.searchQuery);
    this.router.navigate(['/search/datasets']);
    this.showDropDown = false;
  }
}
