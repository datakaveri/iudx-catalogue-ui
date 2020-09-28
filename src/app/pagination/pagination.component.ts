import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  totalItems: number = 125;
  itemsPerPage: number = 10;

  pages = [];
  current: number;
  start: number;
  stepSize: number;
  nextBtn: boolean;
  prevBtn: boolean;
  @Input() totalPages: number;
  constructor() {
    this.current = 1;
    this.stepSize = 4;
    this.start = 1;
    this.nextBtn = false;
    this.prevBtn = false;
  }

  ngOnInit(): void {
    this.getMaxPages();
  }
  setPage(page: number) {
    this.current = page;
    // conditions
  }
  createPages(start, end) {
    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
    this.setPage(this.pages[0]);
  }
  getMaxPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.totalPages > this.stepSize) {
      this.nextBtn = true;
      this.createPages(this.start, this.stepSize);
    } else {
      this.nextBtn = false;
      this.createPages(this.start, this.totalPages);
    }
  }
  getNextPages() {
    this.prevBtn = true;
    this.start += this.stepSize;
    let startIndex = this.start;
    let endIndex = startIndex + (this.stepSize - 1);
    if (endIndex < this.totalPages) {
      this.nextBtn = true;
      this.createPages(startIndex, endIndex);
    } else {
      this.nextBtn = false;
      this.createPages(startIndex, this.totalPages);
    }
  }
  getPreviousPage() {
    if (this.prevBtn == true) {
      this.nextBtn = true;
      this.start -= this.stepSize;
      let startIndex = this.start;
      let endIndex = startIndex + (this.stepSize - 1);
      this.createPages(startIndex, endIndex);

      if (startIndex != 1) {
        this.prevBtn = true;
      } else {
        this.prevBtn = false;
      }
    }
  }
}
