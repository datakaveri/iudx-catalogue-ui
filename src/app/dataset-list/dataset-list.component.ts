import { Component, OnInit } from '@angular/core';
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
  results: any;
  pages: number;
  searchQuery: any;
  show_data: Boolean;
  texts: any;
  tagSelected: any;
  tags: any;
  providers: any;
  constructor(
    private router: Router,
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.show_filter = false;
    this.show_data = false;
    this.results = {};
    this.pages = 0;
    this.search_text = '';
    this.tags = [];
    this.providers = [];
    this.searchQuery = this.constantService.get_search_query();
    this.texts = this.constantService.get_nomenclatures();
    this.constantService.get_filter().subscribe((query: any)=>{
      this.searchQuery = query;
      this.searchDatasets();
    });
    this.httpInterceptor.get_filter().subscribe((flag: any)=>{
      this.show_filter = flag;
    });
    this.searchDatasets();
  }

  ngOnInit(): void {
  }

  getResourceItems(resource) {
    window.sessionStorage.resource_group_id = resource.id;
    window.sessionStorage.resource_group_name = resource.name;
    this.router.navigate(['/search/items']);
  }

  searchDatasets() {
    this.show_data = false;
    if (this.searchQuery.text != '') {
      this.search_text = this.searchQuery.text;
      this.httpInterceptor.post_api('customer/search', this.searchQuery)
      .then((response: any) => {
        this.show_data = true;
        this.results = response;
        this.get_filters(response);
      });
    } else {
      this.search_text = '';
      this.search_text = this.searchQuery.tags.join(', ');
      this.httpInterceptor.post_api('customer/datasets', this.searchQuery)
      .then((response: any) => {
        this.show_data = true;
        this.results = response;
        this.get_filters(response);
      });
    }
  }

  get_filters(response) {
    this.tags = response.tags;
    this.tags.forEach(a=>{
      if(this.searchQuery.tags.includes(a.tag)) a.flag = true;
      else a.flag = false;
    });
    this.providers = response.providers;
    this.providers.forEach(a=>{
      if(this.searchQuery.providers.includes(a.id)) a.flag = true;
      else a.flag = false;
    });
  }

  copy(id) {
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert(this.texts.resource_groups + ' ID copied to Clipboard.');
  }

  close() {
    this.httpInterceptor.set_filter(false);
  }

  toggle_tag(num) {
    this.tags[num].flag = !this.tags[num].flag;
  }

  toggle_provider(num) {
    this.providers[num].flag = !this.providers[num].flag;
  }

  clear() {
    this.tags.forEach(a=>{
      a.flag = false;
    });
    this.providers.forEach(a=>{
      a.flag = false;
    });
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.constantService.set_search_query(this.searchQuery);
    this.close();
    this.searchDatasets();
  }

  apply() {
    let tags = this.tags.filter(a=> { return a.flag == true; }).map(a=> { return a = a.tag });
    let providers = this.providers.filter(a=> { return a.flag == true; }).map(a=> { return a = a.id });
    this.searchQuery.tags = tags;
    this.searchQuery.providers = providers;
    this.constantService.set_search_query(this.searchQuery);
    this.close();
    this.searchDatasets();
  }

}