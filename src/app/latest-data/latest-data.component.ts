import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-latest-data',
  templateUrl: './latest-data.component.html',
  styleUrls: ['./latest-data.component.scss']
})
export class LatestDataComponent implements OnInit {
  item_id: string;
  latestData: any;
  private: boolean = false;
  data_type: any;
  
  constructor(private global: GlobalService, private network: NetworkService) {
    this.latestData = '';
    this.item_id = this.global.get_item_id();
    this.data_type = this.global.get_data_type();
    if(this.data_type == 'SECURE') this.private = true;
    else this.private = false;
    this.getLatestData(this.item_id);
  }

  ngOnInit(): void {
  }
  getLatestData(id: string) {
    this.network
      .get_api_resource_server(
        'https://rs.iudx.org.in/ngsi-ld/v1/entities/' + id
      )
      .then((data) => {
        this.latestData = data;
      });
  }
  close(): void {
    this.global.set_popup(false, 'latest-data');
  }

}
