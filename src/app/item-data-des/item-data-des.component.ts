import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-item-data-des',
  templateUrl: './item-data-des.component.html',
  styleUrls: ['./item-data-des.component.scss']
})
export class ItemDataDesComponent implements OnInit {
  resource: any;
  texts: any;
  data_descriptor: any;
  latestData:any;
  flags: Array<Boolean>;
  constructor(
    private constant: ConstantsService
  ) {
    this.flags = [];
    this.resource = this.constant.get_resource_details();
    console.log(this.resource);
    this.texts = this.constant.get_nomenclatures();
    this.manipulate_data_descriptor(this.resource.resource_group.dataDescriptor);

    this.latestData = [
      {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1,
        'ACCESS_POINT_COUNT2': 1,
        'ACCESS_POINT_COUNT3': 1,
        'ACCESS_POINT_COUNT4': 1
      }, {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1,
        'ACCESS_POINT_COUNT2': 1,
        'ACCESS_POINT_COUNT3': 1,
        'ACCESS_POINT_COUNT4': 1
      }, {
        'HOTSPOT_ID': 71,
        'USER_COUNT': 0,
        'NAME': 'In front of kalyan nagar steel',
        'LASTUPDATETIME': '2020-03-10T13:33:21+05:30',
        'LOCATION_STATUS': 'ON',
        'ACCESS_POINT_COUNT': 1,
        'ACCESS_POINT_COUNT2': 1,
        'ACCESS_POINT_COUNT3': 1,
        'ACCESS_POINT_COUNT4': 1
      }
    ]
  }

  ngOnInit(): void {
  }

  manipulate_data_descriptor(obj) {
    // console.log(obj);
    let arr = [];
    let keys = Object.keys(obj);
    keys.forEach((a,i)=>{
      if(a != '@context' && a != 'type'&& a != 'id' &&a != 'name'&& a != 'description' && a != 'label'){
      let o = { key: a, ...obj[a] };
      arr.push(o);
      }
    });
    this.data_descriptor = arr;
    this.flags.length = this.data_descriptor.length;
    this.data_descriptor.forEach((a,i)=>{
      this.data_descriptor[i] = this.convert_obj_array_of_objs(a);
      this.flags[i] = false;
    });
  }

  convert_obj_array_of_objs(obj) {
    let keys = Object.keys(obj);
    let arr = [];
    keys.forEach((a,i)=>{
      if(a != 'type') {
        let data;
        if(typeof obj[a] == 'string') {
          data = {
            key: a,
            value: obj[a].includes(':') ? obj[a].split(':')[1] : obj[a],
            level: 1
          }
        } else {
          data = {
            key: a,
            value: this.convert_obj_array_of_objs(obj[a]),
            level: 2
          }
        }
        arr.push(data);
      }
    });
    return arr;
  }

  toggle(i) {
    this.flags[i] = !this.flags[i];
  }

}
