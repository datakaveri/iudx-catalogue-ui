import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  search_text: string;
  results: any;
  pages: number;
  show_data: Boolean;
  texts: any;
  active_tab: string;
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
    this.router.events.subscribe((route: any) => {
      if(Object.keys(route).length == 3 && route.url == '/search/dataset' && route.urlAfterRedirects == '/search/dataset') this.get_items();
    });
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
      this.show_data = true;
      this.constantService.set_resource_details(res);
      this.change_tab('Details');
    });
  }

  change_tab(tab) {
    this.active_tab = tab;
    switch(this.active_tab) {
      case 'Details':
        this.router.navigate(['/search/dataset/details']);
        break;
      case 'Descriptors':
        this.router.navigate(['/search/dataset/data-descriptors']);
        break;
      case 'Items':
        this.router.navigate(['/search/dataset/items']);
        break;
    }
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
