import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {
  constructor() {}
  providers = ['Provider 1', 'Provider 2', 'Provider 3', 'Provider 4'];
  ngOnInit(): void {}
  getResourceGroups(value) {
    console.log(value);
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
}
