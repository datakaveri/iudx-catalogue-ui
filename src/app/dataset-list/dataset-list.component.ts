import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {
  @Input() listMapBtn: boolean = false;
  constructor(private router: Router) {}
  resources = {};
  providers = ['Provider 1', 'Provider 2', 'Provider 3', 'Provider 4'];
  ngOnInit(): void {}
  getResourceItems(value) {
    console.log(value);
    this.router.navigate(['/search/items']);
    // Api call here to search and get the results.
    this.listMapBtn = true;
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
