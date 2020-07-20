import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  fadeIn: any;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showChangeCity: boolean = false;

  toggleChangeCity() {
    // fading in the background
    this.fadeIn = document.querySelector('.fadeIn')
    this.fadeIn.style.opacity = 1;
    this.fadeIn.style.visibility = 'visible';

    // showing the changecity popup
    this.showChangeCity = !this.showChangeCity;

  }

  getChangeCity(value) {
    this.showChangeCity = value;
    console.log(value);
  }
}


