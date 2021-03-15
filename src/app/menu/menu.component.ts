import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  popup_status: boolean = false;
  popup_type: string = '';
  current_city: string;
  city: any;

  constructor(private router:Router,private globalservice: GlobalService) { 
    this.globalservice.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
    this.city = this.globalservice.get_city();
    //  console.log(this.city)
    // this.current_city = window.sessionStorage.current_city_name ? window.sessionStorage.current_city_name[0].toUpperCase( ) + window.sessionStorage.current_city_name.substring(1): this.city.name;
    this.current_city = this.city.name;
    // console.log(this.current_city);
  }

  ngOnInit(): void {
  }
  closeMenu(){
    this.globalservice.set_popup(false,'menu');
  }
  open_city_popup(){
    this.globalservice.set_popup(false,'menu');
    this.globalservice.set_popup(true,'city-popup');
  }
}
