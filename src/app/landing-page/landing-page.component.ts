import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  data = {
    resource_groups: 274,
    resource_items: 783,
    api_calls: 2412,
    providers: 17
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAdvancedSearch() {
    this.router.navigate(['advanced-search']);
  }
}
