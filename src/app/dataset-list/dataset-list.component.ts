import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { InterceptorService } from '../interceptor.service';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {
  show_filter: boolean;
  body: {
    providers: [];
  };
  resource_groups = {};
  results: any;
  constructor(
    private router: Router,
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.constantService.get_filter().subscribe((val) => {
      this.show_filter = val;
    });
  }

  ngOnInit(): void {
    this.searchDatasets();
  }
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

  closeFilter() {
    this.show_filter = false;
  }
  searchDatasets() {
    this.httpInterceptor
      .post_api('customer/datasets', this.body)
      .then((response) => {
        this.results = response;
        console.log(this.results);
      });
  }
}
