import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showDevCard: boolean;
  showDocCard: boolean;

  constructor(  public router: Router) {
    this.showDevCard = false;
    this.showDocCard = false;


  }

  ngOnInit(): void {
  }


  getGeoInfo() {
    this.router.navigate(['/search/map']);
  }



}
