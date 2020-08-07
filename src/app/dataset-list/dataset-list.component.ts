import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {
  search_text: string;
  show_filter: boolean;
  body: any;
  resource_groups = {};
  results: any;
  resquery: any;
  search_params: any;
  tags: any;
  provider_filters: [];
  resource_groups_filters: any;
  pages: number;
  searchQuery: {};

  constructor(
    private router: Router,
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.constantService.get_filter().subscribe((val) => {
      this.show_filter = val;
    });
    this.search_text = '';
    this.pages = 0;
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

  ngOnInit(): void {
    this.searchDatasets();
  }
  getResourceItems(_id) {
    console.log(_id);
    this.searchQuery = {
      search_text: '',
      search_params: {
        tags: [],
        providers: [],
        page: 0,
        resource_groups: [_id],
      },
    };
    this.constantService.set_search_query(this.searchQuery);
    this.router.navigate(['/search/items']);
  }
  getDataForProviders(event, option) {
    console.log(event);
    if (event.target.checked == true) {
      console.log('Api will be called');
      console.log(event.target.value, option);
      this.searchQuery = {
        search_text: '',
        search_params: {
          tags: [],
          providers: [option],
          page: 0,
          resource_groups: [],
        },
      };
      this.constantService.set_search_query(this.searchQuery);
      this.body = this.constantService.get_search_query();
      console.log(this.body);
      this.httpInterceptor
        .post_api('customer/datasets', this.body)
        .then((response) => {
          this.results = response;
          console.log(this.results);
        });
    }
  }

  closeFilter() {
    this.show_filter = false;
  }
  searchDatasets() {
    this.body = this.constantService.get_search_query();
    console.log(typeof this.body);
    this.search_text = this.body.search_text;
    this.search_params = this.body.search_params;
    this.tags = this.body.search_params.tags[0];
    this.provider_filters = this.body.search_params.providers;
    this.resource_groups_filters = this.body.search_params.resource_groups;
    this.pages = this.body.search_params.page;
    if (this.search_text) {
      console.log('searchText Called');
      this.httpInterceptor
        .post_api('customer/search', this.body)
        .then((response) => {
          this.results = response;
          console.log(response);
        });
    } else if (this.tags) {
      console.log('searchTags Called');
      this.httpInterceptor
        .post_api('customer/datasets', this.body)
        .then((response) => {
          this.results = response;
          console.log(this.results);
        });
    } else if (this.provider_filters.length !== 0 && this.tags) {
      console.log('ProviderFilters Called');
      this.httpInterceptor
        .post_api('customer/datasets', this.body)
        .then((response) => {
          this.results = response;
          console.log(this.results);
        });
    } else if (this.provider_filters && this.tags && this.pages) {
      console.log('Pages Called');
      this.httpInterceptor
        .post_api('customer/datasets', this.body)
        .then((response) => {
          this.results = response;
          console.log(this.results);
        });
    }
  }
}
