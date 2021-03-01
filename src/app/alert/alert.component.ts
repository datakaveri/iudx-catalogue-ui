import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() props: any;
  constructor(
    private global: GlobalService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.global.set_alert({flag:false});
  }
}
