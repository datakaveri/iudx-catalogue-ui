import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showChangeCity: boolean = false;

  toggleChangeCity() {
    this.showChangeCity = !this.showChangeCity;
  }

  getChangeCity(value) {
    this.showChangeCity = value;
    console.log(value);
  }
}


