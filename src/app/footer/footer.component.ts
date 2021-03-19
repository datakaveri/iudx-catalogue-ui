import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  city: any;
  constructor(
    private globalservice: GlobalService
  ) {
    this.city = this.globalservice.get_city();
  }

  ngOnInit(): void {
  }

}
