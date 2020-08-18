import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  names: any = {};
  tags: any;
  tagSelected: any;
  filteredTags: any = [];
  searchQuery: {};
  query: string;
  show_filter: Boolean;
  show_filter_button: Boolean;
  arrowkeyLocation:any;
  constructor(
    public router: Router,
    private network: InterceptorService,
    private constantService: ConstantsService
  ) {
    this.arrowkeyLocation = -1;
    this.show_filter_button = false;
    this.show_filter = false;
    this.query = '';
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.router.url == '/search/datasets' || this.router.url == '/search/map') this.show_filter_button = true;
        else this.show_filter_button = false;
      }
    });
    this.network.get_filter().subscribe((flag: any)=>{
      this.show_filter = flag;
    });
    this.names = this.constantService.get_nomenclatures();
    this.get_tags();
  }

  ngOnInit(): void { }

  showMap() {
    this.router.navigate(['/search/map']);
  }

  toggle() {
    this.show_filter = !this.show_filter;
    this.network.set_filter(this.show_filter);
  }

  listView() {
    this.router.navigate(['/search/datasets']);
  }

  get_tags() {
    this.network.get_api_wl('customer/tags').then((data) => {
      this.tags = data;
    });
  }

  filterItems(word) {
    let str = word.toLowerCase();
    this.filteredTags = this.tags.filter((e) => {
      return e.tag.toLowerCase().includes(str);
    });
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
      this.query = '';
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
    this.constantService.set_filter(this.searchQuery);
    this.router.navigate(['/search/datasets']);
    this.query = '';
  }

  // list items selection with arrow key
  keyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: // this is the ascii of arrow up
        this.arrowkeyLocation--;
        break;
      case 40: // this is the ascii of arrow down
        this.arrowkeyLocation++;
        break;
    }
  }
}
