import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  resource: any;
  schema_url: string;
  // cities: any[];
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.set_route(this.router.url);
      }
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
    this.httpInterceptor.post_api('customer/items', post_data).then((res: any) => {
      this.show_data = true;
      this.resource = res;
      this.schema_url = this.resource.resource_group['@context'] + this.resource.resource_group.type[1].split('iudx:')[1];
      this.constantService.set_resource_details(res);
      if(this.router.url == '/search/dataset') {
        this.change_tab('Items');
      } else {
        this.set_route(this.router.url);
      }      
    });
  }

  change_tab(tab) {
    this.active_tab = tab;
    switch(this.active_tab) {
      case 'Items':
        this.router.navigate(['/search/dataset/items']);
        break;
      case 'Map':
        // let cities = this.constantService.get_cities();
        // cities.forEach(a=>{
        //   if(a.name == this.resource.resource_group.location.address.split(',')[0]) {
        //     this.constantService.set_city(a);
        //     console.log(a);
        //   }
        // });
        this.router.navigate(['/search/dataset/map-view']);
        break;
    }
  }

  set_route(route) {
    switch(route) {
      case '/search/dataset/items':
        this.active_tab = 'Items';
        break;
      case '/search/dataset/map-view':
        this.active_tab = 'Map';
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
    this.constantService.set_toaster('success', this.texts.resource_groups + ' ID copied to Clipboard.');
  }
}
