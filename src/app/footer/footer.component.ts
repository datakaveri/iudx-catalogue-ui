import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  city: any;
  showChangeCity: boolean;
  overlay: boolean;
  constructor(
    private router: Router,
    private global: ConstantsService
    ) {
    this.showChangeCity = false;
    this.overlay = false;
    this.city = this.global.get_city();
  }

  ngOnInit(): void {
  }

  toggleChangeCity() {
    this.overlay = true;
    this.showChangeCity = true;

  }

  getChangeCity(value) {
    this.showChangeCity = value;
  }

  getOverlayValue(value) {
    this.overlay = value;
  }
}


