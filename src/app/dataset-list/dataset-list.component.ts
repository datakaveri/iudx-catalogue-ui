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
    this.results = {};
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
    this.search_text = sessionStorage.getItem('search_text');
    this.search_params = sessionStorage.getItem('search_params');

    this.searchQuery = {
      search_text: this.search_text,
      search_params: this.search_params,
    };
    this.searchDatasets();
  }
  getResourceItems(_id) {
    // console.log(_id);
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
    if (event.target.checked == true) {
      // console.log(event.target.value, option);
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
      // console.log(sessionStorage.getItem('search_params'));
      this.body = this.constantService.get_search_query();
      this.search_text = this.body.search_text;
      this.search_params = this.body.search_params;
      this.tags = this.body.search_params.tags;
      this.provider_filters = this.body.search_params.providers;
      this.resource_groups_filters = this.body.search_params.resource_groups;
      this.pages = this.body.search_params.page;
      this.body = this.getBody(
        this.search_text,
        this.tags,
        this.provider_filters,
        this.pages
      );
      this.httpInterceptor
        .post_api('customer/datasets', this.body)
        .then((response) => {
          this.results = response;
        });
    }
  }

  closeFilter() {
    this.show_filter = false;
  }
  searchDatasets() {
    this.body = this.constantService.get_search_query();
    this.search_text = this.body.search_text;
    this.search_params = this.body.search_params;
    this.tags = this.body.search_params.tags;
    this.provider_filters = this.body.search_params.providers;
    this.resource_groups_filters = this.body.search_params.resource_groups;
    this.pages = this.body.search_params.page;
    if (this.search_text) {
      this.body = this.getBody(
        this.search_text,
        this.tags,
        this.provider_filters,
        this.pages
      );
      this.httpInterceptor
        .post_api('customer/search', this.body)
        .then((response) => {
          this.results = response;
          // console.log(this.results);
        });
    } else {
      this.body = this.getBody(
        this.search_text,
        this.tags,
        this.provider_filters,
        this.pages
      );
      this.httpInterceptor
        .post_api('customer/datasets', this.body)
        .then((response) => {
          this.results = response;
        });
    }
  }

  getBody(_text, _tags, _providers, _page) {
    this.body = {
      text: _text,
      tags: _tags,
      providers: _providers,
      page: _page,
    };
    return this.body;
  }
}
