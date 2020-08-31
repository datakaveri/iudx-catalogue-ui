import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements AfterViewInit {
  @Input() props: { type: string; message: string; };
  constructor() { }

  ngAfterViewInit() {
    var elm: any = document.getElementsByClassName('toaster')[0];
    if(this.props.type == 'warning') {
      elm.style.backgroundColor = '#FFA700';
      elm.style.color = '#2C2C2C';
    }
    if(this.props.type == 'success') elm.style.backgroundColor = '#00796B';
    if(this.props.type == 'error') elm.style.backgroundColor = '#BD4931';
  }
}
