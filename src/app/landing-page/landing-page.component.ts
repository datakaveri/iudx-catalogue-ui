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
  subMenu1 = false;
  subMenu2 = false;

  showBlack = false;
  showWhite = true;
  showAdvanceSearch = false;
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
  coverImage: any;
  cityCount: number;
  btnLess: boolean;
  btnMore: boolean;
  cities1: boolean;
  cities2: boolean;

  constructor(
    public router: Router,
    private network: InterceptorService,
    private constantService: ConstantsService
  ) {

    this.cities = this.constantService.get_cities();
    this.cityCount = this.cities.length;
    this.cities1 = false;
    this.cities2 = true;
    this.btnLess = false;
    this.query = '';
    this.coverImage = '';
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
    };
    this.city = this.constantService.get_city();
    console.log(this.city)
    this.get_data();
    this.get_tags();
    this.arrowkeyLocation = -1;
    this.showChangeCity = false;
    this.overlay = false;
    if (this.city) {
      this.coverImage = this.city.cover;
    }
    setTimeout(() => {
      this.setCoverIamge(this.city);
    }, 1000);

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
    const str = word.toLowerCase();
    this.filteredTags = this.tags.filter((e) => {
      return e.tag.toLowerCase().includes(str);
    });
  }

  getGeoInfo() {
    this.router.navigate(['/search/map']);
  }

  go_to_city(city) {
    window.open('https://' + city.key + '.' + window.location.host, '_self');

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
        text,
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
    console.log(x);
  }

  go_to_home() {
    this.router.navigate(['/']);
  }

  closeMenu() {
    const checkbox = document.getElementsByClassName('checkbox')[0];
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

  setCoverIamge(city) {

    const landingPage: any = document.getElementsByClassName('landingPage')[0];
    if (city) {
      landingPage.style.backgroundImage = ` linear-gradient(rgba(68, 68, 68, 0.75), rgba(68, 68, 68, 0.75)),url(${city.cover})`;
    } else {
      landingPage.style.backgroundImage = `linear-gradient(rgba(68, 68, 68, 0.75), rgba(68, 68, 68, 0.75)), url('../../assets/landingpagebg.jpeg')`;
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
    const menu = document.getElementById(`submenu1`);
    if (this.subMenu1 == false) {
      this.subMenu1 = true;
      menu.style.display = 'block';
    } else {
      this.subMenu1 = false;
      menu.style.display = 'none';
    }
  }

  toggleSubmenu2() {
    const menu = document.getElementById(`submenu2`);
    if (this.subMenu2 == false) {
      this.subMenu2 = true;
      menu.style.display = 'block';
    } else {
      this.subMenu2 = false;
      menu.style.display = 'none';
    }
  }

  showMore(){
    this.cities1 = true;
    this.cities2 = false;
    this.btnLess = true;
  }
  showLess(){
    this.cities2 = true;
    this.cities1 = false;
  }

}
