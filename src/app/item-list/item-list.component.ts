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
  items: any;
  search_text: string;
  pages: number;
  searchQuery: {};

  constructor(
    private httpInterceptor: InterceptorService,
    private route: ActivatedRoute,
    private constantService: ConstantsService
  ) {
    this.body = {
      resource_groups: [],
      page: 0,
    };
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
    this.getItems();
  }
  getItems() {
    this.body = this.constantService.get_search_query();
    console.log(this.body);
    this.httpInterceptor.post_api('customer/items', this.body).then((res) => {
      console.log(res);
      this.items = res;
    });
  }
}
