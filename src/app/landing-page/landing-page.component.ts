import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConstantsService} from '../constants.service';
import {InterceptorService} from '../interceptor.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  subMenu1: boolean = false;
  subMenu2: boolean = false;

  showBlack: boolean = false;
  showWhite: boolean = true;
  showAdvanceSearch: boolean = false;
  names: any = {};
  query: string;
  resultData: any;
  categoriesData: any[] = [];
  results: any;
  searchQuery: {};
  tags: any;
  tagSelected: any;
  filteredTags: any = [];
  arrowkeyLocation: any;
  city: any;
  showChangeCity: boolean;
  overlay: boolean;
  cities: any;
  summary: any;

  constructor(
    public router: Router,
    private network: InterceptorService,
    private constantService: ConstantsService
  ) {
    this.cities = this.constantService.get_cities();
    this.query = '';
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
    this.names = this.constantService.get_nomenclatures();
    this.searchQuery = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };
    this.summary = {
      datasets: 0,
      resources: 0,
      publishers: 0
    }
    this.city = this.constantService.get_city();
    this.get_data();
    this.get_tags();
    this.arrowkeyLocation = -1;
    this.showChangeCity = false;
    this.overlay = false;


  }

  ngOnInit(): void {

  }

  get_data() {
    this.network.get_api('customer/summary').then((data) => {
      this.summary = data;
    });
  }

  get_tags() {
    this.network.get_api('customer/tags').then((data) => {
      this.tags = data;
    });
  }

  filterItems(word) {
    let str = word.toLowerCase();
    this.filteredTags = this.tags.filter((e) => {
      return e.tag.toLowerCase().includes(str);
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
    if (text.trim() !== '') {
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

  toggleChangeCity() {
    this.overlay = true;
    this.showChangeCity = true;
    this.closeMenu();
  }

  getChangeCity(value) {
    this.showChangeCity = value;
  }

  getOverlayValue(value) {
    this.overlay = value;
  }

  log(x) {
    console.log(x)
  }

  go_to_home() {
    this.router.navigate(['/']);
  }

  closeMenu() {
    let checkbox = document.getElementsByClassName('checkbox')[0];
    // @ts-ignore
    checkbox.checked = false;
    // @ts-ignore
    if (this.showWhite === true) {
      this.showBlack = true;
      this.showWhite = false;
    } else {
      this.showWhite = true;
      this.showBlack = false;
    }

  }


  toggleMenu() {
    if (this.showWhite === true) {
      this.showBlack = true;
      this.showWhite = false;
    } else {
      this.showWhite = true;
      this.showBlack = false;
    }
  }

  toggleSubmenu1() {
    let menu = document.getElementById(`submenu1`)
    if (this.subMenu1 == false) {
      this.subMenu1 = true;
      menu.style.display = 'block';
    } else {
      this.subMenu1 = false;
      menu.style.display = 'none';
    }
  }

  toggleSubmenu2() {
    let menu = document.getElementById(`submenu2`)
    if (this.subMenu2 == false) {
      this.subMenu2 = true;
      menu.style.display = 'block';
    } else {
      this.subMenu2 = false;
      menu.style.display = 'none';
    }
  }
}
