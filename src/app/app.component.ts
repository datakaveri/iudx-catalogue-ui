import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private title: Title
  ) {
    let host = location.host == 'localhost:4000' ? 'Local' : location.host.split('.')[0];
    this.title.setTitle(host + " Data Kaveri | Indian Urban Data Exchang");
  }
}