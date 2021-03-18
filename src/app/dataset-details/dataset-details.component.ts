import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.scss']
})
export class DatasetDetailsComponent implements OnInit {
  show_data:boolean ;
  active_tab: string;
  search_text: string;
  results: any;
  pages: number;
  texts: any;
  resource: any;
  schema_url: string = '';
  id: any;
  constructor(private router:Router, private global: GlobalService,private network: NetworkService, private route: ActivatedRoute) {
    this.active_tab = 'Items';
    this.show_data = false;
    this.results = {};
    this.pages = 0;
    this.search_text = window.sessionStorage.resource_group_name;
    this.texts = this.global.get_nomenclatures();
    this.get_items();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // console.log(this.id)
   });
   this.router.events.subscribe((route: any) => {
    if(Object.keys(route).length == 3 && route.url == ('/dataset-details/'+this.id) && route.urlAfterRedirects == ('dataset-details/'+this.id)) this.get_items();
  });
    this.router.events.subscribe((event) => {
      // console.log(event)
      if (event instanceof NavigationEnd) {
        this.set_route(this.router.url);
        // console.log(this.router.url)
      }
    });
   }

  ngOnInit(): void {
  }

  get_items() {
    this.show_data = false;
    let post_data = {
      "resource_groups":[window.sessionStorage.resource_group_id],
      "page": 0
    }
    this.network.post_api('customer/items', post_data).then((res: any) => {
      this.show_data = true;
      // console.log(res)
      this.resource = res;
      this.schema_url = this.resource.resource_group['@context'] + this.resource.resource_group.type[1].split('iudx:')[1];
      this.global.set_resource_details(res);
      if(this.router.url == '/dataset-details/'+this.id) {
        this.change_tab('Items');
      } else {
        this.set_route(this.router.url);
      }      
    });
  }
  set_route(route: string) {
    switch(route) {
      case '/dataset-details/'+this.id+'/resources':
        this.active_tab = 'Items';
        break;
      case '/dataset-details/'+this.id+'/map':
        this.active_tab = 'Map';
        break;
    }
  }

  change_tab(tab: string) {
    this.active_tab = tab;
    switch(this.active_tab) {
      case 'Items':
        this.router.navigate(['/dataset-details/'+ this.id +'/resources']);
        break;
      case 'Map':
        this.router.navigate(['/dataset-details/'+ this.id +'/map']);
        break;
    }
  }

   back() {
    this.router.navigate(['/datasets']);
  }
  copy(id:any) {
    // console.log(id)
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.global.set_toaster('success', this.texts.resource_groups + ' ID copied to Clipboard.');
  }
}
