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
      if(this.searchQuery.tags){
        this.filters.tag = '',
        this.tags_filter = this.searchQuery.tags;
      }
      if(this.searchQuery.text){
        this.filters.tag = '',
        this.tags_filter = this.searchQuery.text;
      }
      this.searchDatasets();
    });
    this.searchQuery = this.globalservice.get_search_query();
    if(this.searchQuery.tags.length !== 0){
    this.filters.tag = this.searchQuery.tags.join(', ');
    }
    this.texts = this.globalservice.get_nomenclatures();
    
    this.searchDatasets();
  }

  ngOnInit(): void {
  }

  get_provider_name(){
    let resp = this.globalservice.get_id_name_rel();
    this.searchQuery.providers.forEach((a:any) => {
      if(resp.hasOwnProperty(a)) {
        a = resp[a];
      this.filter_name.push(a);
      }
      this.filters.provider = this.filter_name.join(', ');
    });
  }

  searchDatasets() {
    if (this.searchQuery.text != '') {
      this.search_text = this.searchQuery.text;
    } else {
      this.search_text = this.searchQuery.tags.join(', ');
    }
    this.network
    .post_api('customer/datasets', this.searchQuery)
    .then((response: any) => {
      this.datasets = response;
      this.datasets.tags.forEach((a: any, i:number)=>{
        this.datasets.tags[i] = { tag: a };
      });
      this.get_provider_name();
    });
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
    this.router.navigate(['/dataset-details/' + resource.id.split('/')[3]]);
  }

  downloadData(data: any) {
    if(data.includes('.mp4')){
      this.globalservice.set_resource_item(data);
      this.globalservice.set_popup(true, 'sample-video');

    }
    else{
      window.open(data, '_blank');
    }
  
  }


}
