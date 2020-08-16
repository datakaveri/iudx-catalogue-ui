import { Component } from '@angular/core';
import { InterceptorService } from './interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader: Boolean;
  constructor(
    private network: InterceptorService
  ) {
    this.loader = false;
    this.network.get_loader().subscribe(flag => {
      this.loader = flag;
    });
  }
}