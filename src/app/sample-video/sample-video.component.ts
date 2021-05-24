import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-sample-video',
  templateUrl: './sample-video.component.html',
  styleUrls: ['./sample-video.component.scss']
})
export class SampleVideoComponent implements OnInit {
  data: string;

  constructor(private global: GlobalService) {
    this.data = this.global.get_resource_item();
    // console.log(this.data)
  }

  ngOnInit(): void {
  }

  close(): void {
    this.global.set_popup(false, 'sample-video');
  }
}
