import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  search_text: string;
  results: any;
  pages: number;
  show_data: Boolean;
  texts: any;
  constructor(
    private router: Router,
    private httpInterceptor: InterceptorService,
    private constantService: ConstantsService
  ) {
    this.show_data = false;
    this.results = {};
    this.pages = 0;
    this.search_text = window.sessionStorage.resource_group_name;
    this.texts = this.constantService.get_nomenclatures();
    this.get_items();
  }

  ngOnInit(): void {
  }

  get_items() {
    this.show_data = false;
    let post_data = {
      "resource_groups":[window.sessionStorage.resource_group_id],
      "page": 0
    }
    this.httpInterceptor.post_api('customer/items', post_data).then((res) => {
      this.results = res;
      this.show_data = true;
    });
  }

  back() {
    this.router.navigate(['/search/datasets']);
  }

  copy(id) {
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert(this.texts.resource_items + ' ID copied to Clipboard.');
  }

}
