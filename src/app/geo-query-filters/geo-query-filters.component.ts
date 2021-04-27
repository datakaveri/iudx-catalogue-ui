import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-geo-query-filters',
  templateUrl: './geo-query-filters.component.html',
  styleUrls: ['./geo-query-filters.component.scss']
})
export class GeoQueryFiltersComponent implements OnInit {
  data: any = '';
  search:any;
  count: any;
  limit: Number;
  popup_status: boolean = false;
  popup_type: string = '';
  filtered_resource_groups: any=[];
  texts: { resource_groups: string; resource_items: string; providers: string; };
  resource_groups: any;
  searchQuery: { resource_groups: any []; };

  constructor(private global: GlobalService) {
    this.limit = 5;
    this.texts = this.global.get_nomenclatures();
    this.search = {
      group: '',
    };
    this.searchQuery = JSON.parse(window.sessionStorage.map_search);
    this.resource_groups = this.global.get_filter_rsg();
    this.get_filters();
  }
  get_filters() {
      this.filtered_resource_groups = this.resource_groups;
      this.resource_groups.forEach((a : any) => {
        if (this.searchQuery.resource_groups.includes(a.id)) a.flag = true;
        else a.flag = false;
      });
    }

  ngOnInit(): void {
  }

  filter_by_group() {
    let str = this.search.group.toLowerCase();
    this.filtered_resource_groups = this.resource_groups.filter((e :any) => {
      return e.label.toLowerCase().includes(str);
    });
  }
  toggle_dataset(id :any) {
    this.resource_groups.forEach((a:any, i:any) => {
      if (a.id == id) {
        let flag = !this.resource_groups[i].flag;
        if (flag && this.count == this.limit) {
          this.global.set_alert({
            flag: true,
            title: 'Limit Exceeeded.',
            message: 'You can filter by maximum 5 resource groups at a time.',
          });
        } else if (flag && this.count < this.limit) {
          this.resource_groups[i].flag = !this.resource_groups[i].flag;
          this.count++;
        } else {
          this.resource_groups[i].flag = !this.resource_groups[i].flag;
          this.count--;
        }
      }
    });
  }
  find_group_status(id: any) {
    let flag = false;
    this.resource_groups.forEach((a: any) => {
      if (a.id == id && a.flag == true) flag = true;
    });
    return flag;
  }

  clear() {
    this.count = 0;
    this.resource_groups.forEach((a: any) => {
      a.flag = false;
    });
    this.searchQuery = {
      resource_groups: [],
    };
    window.sessionStorage.map_search = JSON.stringify(this.searchQuery);
  }

  apply_filter() {
    this.searchQuery.resource_groups = this.resource_groups
    .filter((a: any) => {
      return a.flag == true;
    })
    .map((a :any) => {
      return (a = a.id);
    });
    if(this.searchQuery.resource_groups.length == 0){
      this.global.set_toaster('error','Please select 1 or more dataset.')
      return;
    } 
    window.sessionStorage.map_search = JSON.stringify(this.searchQuery);
    this.close_filter();
  }

  close_filter(): void {
    if(this.searchQuery.resource_groups.length == 0){
      this.global.set_toaster('error','Please select 1 or more dataset.')
      return;
    }  
    this.global.set_popup(false, 'geo-filter');
  }
}
