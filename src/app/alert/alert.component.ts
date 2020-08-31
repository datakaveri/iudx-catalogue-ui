import { Component, OnInit, Input } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() props: any;
  constructor(
    private global: ConstantsService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.global.set_alert({flag:false});
  }
}
