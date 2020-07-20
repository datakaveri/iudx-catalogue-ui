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
  constructor() {}

  ngOnInit(): void {}
  pageChanged(event) {
    console.log(event);
    this.currentPage = event.page;
    this.itemsPerPage = event.itemsPerPage;
  }
}
