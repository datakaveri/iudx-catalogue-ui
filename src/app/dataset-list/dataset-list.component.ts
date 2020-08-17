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
    this.searchQuery = this.constantService.get_search_query();
    this.texts = this.constantService.get_nomenclatures();
    this.constantService.get_filter().subscribe((query: any)=>{
      this.searchQuery = query;
      this.searchDatasets();
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
      this.httpInterceptor
      .post_api('customer/search', this.searchQuery)
      .then((response) => {
        this.show_data = true;
        this.results = response;
      });
    } else {
      this.search_text = '';
      this.searchQuery.tags.forEach((a,i)=>{
        this.search_text += a + (i < (this.searchQuery.tags.length - 1) ? ', ' : '');
      });
      this.httpInterceptor
        .post_api('customer/datasets', this.searchQuery)
        .then((response) => {
          this.show_data = true;
          this.results = response;
        });
    }
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

  getSearchResultsByText(text: string) {
    if(text.trim() !== ''){
      this.searchQuery = {
        text: text,
        tags: [],
        providers: [],
        page: 0,
      };
      this.constantService.set_search_query(this.searchQuery);
      this.router.navigate(['/search/datasets']);
    }
  }

  getSearchResultsByTag(value) {
    this.tagSelected = value;
    this.searchQuery = {
      text: '',
      tags: [this.tagSelected],
      providers: [],
      page: 0,
    };
    this.constantService.set_search_query(this.searchQuery);
    this.router.navigate(['/search/datasets']);
  }

}
