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
  showDropdown:boolean = false;
  results:any;
  body:any;

  tags:any;
  filteredTags:any = [];



  constructor(public router: Router, private _search: InterceptorService, private constant: ConstantsService) {
    this.showAdvanceSearch = false;
    this.overlay = false;
    this.names = this.constant.get_nomenclatures();
    this.body = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
    };

    this.get_data();
    this.get_tags();
   
  }

  ngOnInit(): void {
    // this.get_data();
    // this.get_tags();
  }

  get_data() {
    this._search.get_api('customer/summary')
    .then((data) => {
      this.resultData = data;
      console.log(this.resultData);
    }
    ).catch(e => {
      console.log(e);
    });
  }

  get_tags(){
    this._search.get_api('customer/tags')
    .then((data) => { 
      this.tags = data;
      console.log(this.tags);
      
    }).catch(e => {
      console.log(e);
    });
  }


  handleChange(word=this.query) {
    
   this.filteredTags = this.tags.filter((e)=> {
     return e.tag.toLowerCase().includes(word);
   })
   console.log(this.filteredTags);
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
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
  getSearchResults(text: string) {
    console.log(text);
    this.router.navigate(['/search/datasets'], { queryParams: { term: text } });
    this._search.post_api('customer/search', this.body).then((response) => {
      console.log(response);
    });
  }
}
