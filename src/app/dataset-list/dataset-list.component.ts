import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {
  constructor(private router: Router) {}
  providers = [
    'Provider 1',
    'Provider 2',
    'Provider 3',
    'Provider 4',
    'Provider 5',
    'Provider 6',
  ];
  resource_grps = [
    {
      description:
        'Describes Air Qwality Monitoring (AQM) Resource in Varanasi',
      tags: 'sensor, sensing, resource, battery operated',
      status: 'Active',
      provider: 'Provider 1',
      control_level: 'level_1',
      created_at: '2019-02-20T10:30:06.093121',
      location: {
        type: 'Place',
        address: 'Bangalore, India',
      },
    },
    {
      description:
        'Describes Air Qwality Monitoring (AQM) Resource in Varanasi',
      tags: 'sensor, sensing, resource, battery operated',
      status: 'active',
      provider: 'Provider 1',
      control_level: 'level_1',
      created_at: '2019-02-20T10:30:06.093121',
      location: {
        type: 'Place',
        address: 'Bangalore',
      },
    },
    {
      description:
        'Describes Air Qwality Monitoring (AQM) Resource in Varanasi',
      tags: 'sensor, sensing, resource, battery operated',
      status: 'active',
      provider: 'Provider 1',
      control_level: 'level_1',
      created_at: '2019-02-20T10:30:06.093121',
      location: {
        type: 'Place',
        address: 'Bangalore',
      },
    },
  ];
  ngOnInit(): void {}
  getResourceItems(value) {
    console.log(value);
    this.router.navigate(['/search/items']);
    // Api call here to search and get the results.
  }
  getDataForProviders(event, option) {
    // console.log(event.target.value, option);
    console.log(event);
    if (event.target.checked == true) {
      console.log('Api will be called');
      console.log(event.target.value, option);
    }
  }
  overlayValue: boolean;
  @Output() showOverlay = new EventEmitter();

  //set true to show side bar
  public showFilter: boolean;

  public closeFilter() {
    this.overlayValue = false;
    this.showFilter = false;
    this.showOverlay.emit(this.overlayValue);
  }
  @Input('openFilter')
  set setData(value: boolean) {
    this.showFilter = value;
  }
}
