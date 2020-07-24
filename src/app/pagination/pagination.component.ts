import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  // @Input() maxPages: number;

  // @Input() current: number;
  // @Input() itemsPerPage: number;

  // @Output() changePage = new EventEmitter();

  // pages: any[] = [];
  // pageModel: Page = {
  //   page: this.current,
  //   itemsPerPage: this.itemsPerPage,
  // };

  totalItems: number = 45;
  itemsPerPage: number = 10;
  totalPages: number;
  pages = [];
  current: number = 1;

  constructor() {}

  ngOnInit(): void {
    // if (this.maxPages) {
    //   this.createPages();
    // }
    this.getMaxPages();
  }
  setPage(page: number, perPage: number) {
    this.current = page;
    console.log(this.current);
    // conditions
  }

  createPages() {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  getMaxPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    console.log(this.totalPages);
    if (this.current)
      if (this.pages) {
        this.createPages();
      }
  }
}
