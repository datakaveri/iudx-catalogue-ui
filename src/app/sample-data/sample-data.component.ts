import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss']
})
export class SampleDataComponent implements OnInit {
  data: string;

  constructor(private global: GlobalService) {
   
    this.data =  this.global.get_resource_item();

  }

  ngOnInit(): void {
  }

  close(): void {
    this.global.set_popup(false, 'sample-data');
  }

  

}
