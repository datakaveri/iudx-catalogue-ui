import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { NetworkService } from '../network.service';
import { Location }  from '@angular/common';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
  data: any = [];
  popup_status: boolean = false;
  popup_type: string = '';
  search_text: string= '';
  datasets : any ={};
  pages: number =0;
  searchQuery: any;
  texts: any;
  tagSelected: any;
  tags: any =[];
  filtered_tags: any = [];
  providers: any = [];
  filtered_providers: any = [];
  showSample: boolean = false;
  sampleData: any;
  filters: any;
  filter_name: any=[];
  provider_name: any;
  tags_filter: any;
  constructor(private router: Router, private globalservice: GlobalService, private network: NetworkService, private location: Location) {
    this.filters = {
      tag: '',
      provider: '',
    };
    this.globalservice.get_popup().subscribe((data) => {
      if(data.flag == false && data.type == 'dataset-filter'){
        this.tags_filter = '',
        this.searchQuery =  this.globalservice.get_search_query();
        if(this.searchQuery.tags.length != 0 || this.searchQuery.providers.length !=0){
          this.get_provider_name();
          // this.filters.tag = this.searchQuery.tags[0].charAt(0).toUpperCase() + this.searchQuery.tags[0].substr(1) + ', ' + this.searchQuery.tags.slice(1).join(', ');
          this.filters.tag = this.searchQuery.tags.join(', ');
          }
          else{
            this.filters = {
              tag: '',
              provider: '',
            };
          }
          this.searchDatasets();
        }
    });
    this.globalservice.get_filter().subscribe((query: any) => {
      this.searchQuery = query;
      //console.log(this.searchQuery)
      if(this.searchQuery.tags){
        this.filters.tag = '',
        this.tags_filter = this.searchQuery.tags;
        //console.log(this.tags_filter)
      }
      if(this.searchQuery.text){
        this.filters.tag = '',
        this.tags_filter = this.searchQuery.text;
        //console.log(this.tags_filter)
      }
      this.searchDatasets();
    });
    this.searchQuery = this.globalservice.get_search_query();
     //console.log(this.searchQuery)
    this.get_provider_name();
    if(this.searchQuery.tags.length !== 0){
    //  this.filters.tag = this.searchQuery.tags[0].charAt(0).toUpperCase() + this.searchQuery.tags[0].substr(1) + ', ' + this.searchQuery.tags.slice(1).join(', ');
    this.filters.tag = this.searchQuery.tags.join(', ');
    }
    this.texts = this.globalservice.get_nomenclatures();
    
    this.searchDatasets();
  }

  ngOnInit(): void {
    this.searchDatasets();
  }

  get_provider_name(){
    this.network.get_api('/customer/get-name-id-rel').then((resp:any)=>{
      this.searchQuery.providers.forEach((a:any) => {
        if(resp.hasOwnProperty(a)) {
          a = resp[a];
          //console.log(a)
        this.filter_name.push(a);
        }
        this.filters.provider = this.filter_name.join(', ');
        // console.log(this.filters.provider)
      });
    });
  }

  searchDatasets() {
    if (this.searchQuery.text != '') {
      this.search_text = this.searchQuery.text;
      this.network
        .post_api('customer/search', this.searchQuery)
        .then((response: any) => {
           //console.log(response);
          this.datasets = response;
        });
    } else {
      this.search_text = '';
      this.search_text = this.searchQuery.tags.join(', ');
      // console.log(this.searchQuery)
      this.network
        .post_api('customer/datasets', this.searchQuery)
        .then((response: any) => {
          this.datasets = response;
        });
    }
  }

  back() {
    this.router.navigate(['/'])
  }

  open_dataset_filter(resources : any) {
    sessionStorage.setItem("tags", JSON.stringify(resources.tags));
    sessionStorage.setItem("providers", JSON.stringify(resources.providers));
    this.filter_name = [];
    this.globalservice.set_popup(true, 'dataset-filter');
  }
  copy(id : any) {
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.globalservice.set_toaster(
      'success',
      `${this.texts.resource_groups} ID copied to Clipboard.`
    );
  }
  getResourceItems(resource : any) {
    window.sessionStorage.resource_group_id = resource.id;
    window.sessionStorage.resource_group_name = resource.name;
    this.router.navigate(['/dataset-details',resource.id.split('/')[3]]);
  }

}
