import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  showChangeCity: boolean;
  overlay: boolean;


  constructor(private router: Router) {
    this.showChangeCity = false;
    this.overlay = false;
  }

  ngOnInit(): void {
  }

  toggleChangeCity() {
    // showing the overlay
    this.overlay = true;
    // showing the changecity popup
    this.showChangeCity = true;

  }

  getChangeCity(value) {
    this.showChangeCity = value;
  }

  getOverlayValue(value) {
    this.overlay = value;
  }
}


