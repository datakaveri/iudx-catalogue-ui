import { Component, OnInit } from '@angular/core';
import { InterceptorService } from '../interceptor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  val: any;
  body: {};
  resource_items: {};

  // resource_items = [
  //   {
  //     name: 'sensorA',
  //     description: 'Description of this resource group',
  //     tags: 'sensor, sensing, resource, battery operated',
  //     status: 'active',
  //     resource_group: 'Description of this resource group',
  //     provider: 'Provider Name',
  //     control_level: 'level_1',
  //     created_at: '2019-02-20T10:30:06.093121',
  //     modified_at: '2019-02-20T10:30:06.093121',
  //     location: {
  //       type: 'Place',
  //       address: 'IISc, Bangalore-560092, India',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [75.92, 14.5],
  //       },
  //     },
  //   },
  //   {
  //     name: 'sensorA',
  //     description: 'Description of this resource group',
  //     tags: 'sensor, sensing, resource, battery operated',
  //     status: 'active',
  //     resource_group: 'Description of this resource group',
  //     provider: 'Provider Name',
  //     control_level: 'level_1',
  //     created_at: '2019-02-20T10:30:06.093121',
  //     modified_at: '2019-02-20T10:30:06.093121',
  //     location: {
  //       type: 'Place',
  //       address: 'IISc, Bangalore-560092, India',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [75.92, 14.5],
  //       },
  //     },
  //   },
  // ];

  constructor(
    private httpInterceptor: InterceptorService,
    private route: ActivatedRoute
  ) {
    this.body = {
      resource_groups: [],
      page: 0,
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.val = params.id;
    });
    this.getItems(this.val);
  }
  getItems(_id) {
    this.httpInterceptor.post_api('customer/items', this.body).then((res) => {
      console.log(res);
      this.resource_items = res;
      console.log(this.resource_items[0]);
    });
  }
}
