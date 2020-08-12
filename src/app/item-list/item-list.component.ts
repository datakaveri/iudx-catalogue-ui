import { Component, OnInit } from '@angular/core';
import { InterceptorService } from '../interceptor.service';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  val: any;
  body: {};
  resource_items: any;
  search_text: string;
  search_params: any;
  pages: number;
  searchQuery: {};
  resource_grps: any;
  totalPages: number;

  constructor(
    private httpInterceptor: InterceptorService,
    private route: ActivatedRoute,
    private constantService: ConstantsService
  ) {
    this.resource_items = {};
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
    this.getItems();
  }
  getItems() {
    this.resource_grps = this.constantService.get_search_query().search_params.resource_groups[0];
    this.pages = this.constantService.get_search_query().search_params.page;
    this.body = {
      resource_groups: [this.resource_grps],
      page: this.pages,
    };
    this.httpInterceptor.post_api('customer/items', this.body).then((res) => {
      this.resource_items = res;
    });
  }
}
