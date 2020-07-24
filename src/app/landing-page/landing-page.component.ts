import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showAdvanceSearch: boolean = false;
  overlay: boolean = false;
  names: any = {};

  data = {
    resource_groups: 274,
    resource_items: 783,
    api_calls: 2412,
    providers: 17
  }

  constructor(private router: Router) {
    this.showAdvanceSearch = false;
    this.overlay = false;
    this.names = new ConstantsService();
  }

  ngOnInit(): void {
  }



  goToAdvanceSearch() {
    // showing the overlay
    this.overlay = true;
    // showing the advanceSearch popup
    this.showAdvanceSearch = true;
  }

  getAdvanceSearch(value) {
    this.showAdvanceSearch = value;
  }

  getOverlay(value) {
    this.overlay = value;
  }
}
