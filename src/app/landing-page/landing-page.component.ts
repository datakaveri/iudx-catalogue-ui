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
  body: any;
  searchQuery: {};
  searchTag: {};
  tags: any;
  tagSelected: any;
  filteredTags: any = [];
  constructor(
    public router: Router,
    private _search: InterceptorService,
    private constantService: ConstantsService
  ) {
    this.query = '';
    this.showAdvanceSearch = false;
    this.overlay = false;
    this.names = this.constantService.get_nomenclatures();
    this.body = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.searchQuery = {
      search_text: '',
      search_params: {
        tags: [],
        providers: [],
        page: 0,
        resource_groups: [],
      },
    };

    this.searchTag = {
      search_tag: '',
      search_params: {
        tags: [],
        providers: [],
        page: 0,
        resource_groups: [],
      },
    }

    this.get_data();
    this.get_tags();
  }

  ngOnInit(): void {
  }

  get_data() {
    this._search.get_api('customer/summary')
      .then((data) => {
        this.resultData = data;
      }
      ).catch(e => {
        console.log(e);
      });
  }

  get_tags() {
    this._search.get_api('customer/tags')
      .then((data) => {
        this.tags = data;
      }).catch(e => {
        console.log(e);
      });
  }


  handleChange(word = this.query) {
    this.filteredTags = this.tags.filter((e) => {
      return e.tag.toLowerCase().includes(word);
    });
  }

  goToAdvanceSearch() {
    // showing the overlay
    this.overlay = true;
    // showing the advanceSearch popup
    this.showAdvanceSearch = true;
  }

  // getAdvanceSearch(value) {
  //   this.showAdvanceSearch = value;
  // }

  getOverlay(value) {
    this.overlay = value;
  }

  getGeoInfo() {
    this.router.navigate(['/search/map']);
  }

  getAllDatasets() {
    this.searchQuery = {
      search_text:'',
      search_params: {
        tags: [],
        providers: [],
        page: 0,
        resource_groups: [],
      },
    };
    this.constantService.set_search_query(this.searchQuery);
    this.router.navigate(['/search/datasets']);
  }

  getSearchResultsByText(text: string) {
    this.searchQuery = {
      search_text: text,
      search_params: {
        tags: [],
        providers: [],
        page: 0,
        resource_groups: [],
      },
    };
    this.constantService.set_search_query(this.searchQuery);
    this.router.navigate(['/search/datasets']);
  }

  getSearchResultsByTag(event) {
    this.tagSelected = event.currentTarget.firstChild.innerText
    this.searchQuery = {
      search_text:'',
      search_params: {
        tags: [this.tagSelected],
        providers: [],
        page: 0,
        resource_groups: [],
      },
    };
    this.constantService.set_search_query(this.searchQuery);
    this.router.navigate(['/search/datasets']);
  }
}
