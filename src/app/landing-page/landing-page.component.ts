import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  showAdvanceSearch: boolean = false;
  overlay: boolean = false;
  names: any = {};
  query: string;
  resultData: any;
  categoriesData: any[] = [];
  results: any;
  searchQuery: {};
  tags: any;
  tagSelected: any;
  filteredTags: any = [];
  city: any;
  constructor(
    public router: Router,
    private network: InterceptorService,
    private constantService: ConstantsService
  ) {
    this.query = '';
    // this.showAdvanceSearch = false;
    this.categoriesData = [
      {
        name: 'Transport',
        image: 'https://dk-ui.s3.ap-south-1.amazonaws.com/transport.png',
      },
      {
        name: 'Education',
        image: 'https://dk-ui.s3.ap-south-1.amazonaws.com/education.png',
      },
      {
        name: 'Finance',
        image: 'https://dk-ui.s3.ap-south-1.amazonaws.com/finance.png',
      },
      {
        name: 'Environment',
        image: 'https://dk-ui.s3.ap-south-1.amazonaws.com/environment.png',
      },
    ];
    this.overlay = false;
    this.names = this.constantService.get_nomenclatures();
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.city = this.constantService.get_city();
    this.get_data();
    this.get_tags();
  }

  ngOnInit(): void {}

  get_data() {
    this.network.get_api('customer/summary').then((data) => {
      this.resultData = data;
    });
  }

  get_tags() {
    this.network.get_api('customer/tags').then((data) => {
      this.tags = data;
    });
  }

  filterItems(word) {
    this.filteredTags = this.tags.filter((e) => {
      return e.tag.toLowerCase().includes(word);
    });
  }

  getGeoInfo() {
    this.router.navigate(['/search/map']);
  }


  getAllDatasets() {
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.constantService.set_search_query(this.searchQuery);
    this.router.navigate(['/search/datasets']);
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

  getOverlay(value) {
    this.overlay = value;
  }
}
