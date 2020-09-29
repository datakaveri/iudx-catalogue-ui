import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showDevCard: boolean;
  showDocCard: boolean;
  city: any;
  constructor(public router: Router, private constant: ConstantsService) {
    this.showDevCard = false;
    this.showDocCard = false;
    this.city = this.constant.get_city();
  }

  ngOnInit(): void {}

  getGeoInfo() {
    this.router.navigate(['/search/map']);
  }
}
