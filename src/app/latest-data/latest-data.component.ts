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
    this.item_id = this.global.get_item_id();
    this.data_type = this.global.get_data_type();
    if(this.data_type == 'SECURE') this.private = true;
    else this.private = false;
    this.getLatestData(this.item_id);
  }

  ngOnInit(): void {
  }
  getLatestData(id: string) {
    // console.log(id);
    //  this.interceptorService.get_api_resource_server('https://rs.iudx.io/ngsi-ld/v1/entities/iisc.ac.in/89a36273d77dac4cf38114fca1bbe64392547f86/rs.iudx.io/surat-itms-realtime-information/surat-itms-live-eta').then((data)=>{
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
