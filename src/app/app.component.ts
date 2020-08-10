import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ConstantsService } from './constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private title: Title,
    private constant: ConstantsService
  ) {
    let host = location.host == 'localhost:4000' ? 'ui-test' : location.host.split('.')[0];
    this.title.setTitle(host + " Data Kaveri | Indian Urban Data Exchang");
    this.constant.set_city(host);
  }
}