import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showAdvanceSearch: boolean = false;
  fadeIn: any;

  data = {
    resource_groups: 274,
    resource_items: 783,
    api_calls: 2412,
    providers: 17
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAdvanceSearch() {
    // this.router.navigate(['advanced-search']);

    this.fadeIn = document.querySelector('.fadeIn')
    this.fadeIn.style.opacity = 1;
    this.fadeIn.style.visibility = 'visible';

    // showing the advanceSearch popup
    this.showAdvanceSearch = true;
  }

  getAdvanceSearch(value) {
    this.showAdvanceSearch = value;
  }
}
