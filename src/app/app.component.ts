import { Component } from '@angular/core';
import { InterceptorService } from './interceptor.service';
import { ConstantsService } from './constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader: Boolean;
  toast_props: any;
  show_toast: Boolean;
  alert_props: any;
  show_alert: Boolean;
  constructor(
    private network: InterceptorService,
    private global: ConstantsService
  ) {
    this.loader = false;
    this.show_toast = false;
    this.show_alert = false;
    this.network.get_loader().subscribe(flag => {
      this.loader = flag;
    });
    this.global.get_toaster().subscribe(data => {
      this.toast_props = data;
      this.show_toast = true;
      setTimeout(()=>{
        this.show_toast = false;
      }, 2000);
    });
    this.global.get_alert().subscribe(data => {
      this.alert_props = data;
      this.show_alert = data.flag;
    });
  }
}