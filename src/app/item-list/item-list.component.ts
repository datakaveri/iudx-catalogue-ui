import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  itemsPerPage: number = 10;
  maxPages: number = 6;
  currentPage: any;
  resource_items = [
    {
      name: 'sensorA',
      description: 'Description of this resource group',
      tags: 'sensor, sensing, resource, battery operated',
      status: 'active',
      resource_group: 'Description of this resource group',
      provider: 'Provider Name',
      control_level: 'level_1',
      created_at: '2019-02-20T10:30:06.093121',
      modified_at: '2019-02-20T10:30:06.093121',
      location: {
        type: 'Place',
        address: 'IISc, Bangalore-560092, India',
        geometry: {
          type: 'Point',
          coordinates: [75.92, 14.5],
        },
      },
    },
    {
      name: 'sensorA',
      description: 'Description of this resource group',
      tags: 'sensor, sensing, resource, battery operated',
      status: 'active',
      resource_group: 'Description of this resource group',
      provider: 'Provider Name',
      control_level: 'level_1',
      created_at: '2019-02-20T10:30:06.093121',
      modified_at: '2019-02-20T10:30:06.093121',
      location: {
        type: 'Place',
        address: 'IISc, Bangalore-560092, India',
        geometry: {
          type: 'Point',
          coordinates: [75.92, 14.5],
        },
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  pageChanged(event) {
    console.log(event);
    this.currentPage = event.page;
    this.itemsPerPage = event.itemsPerPage;
  }
}
