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
  constructor(
    private constant: ConstantsService
  ) { 
    this.resource = this.constant.get_resource_details();
    this.texts = this.constant.get_nomenclatures();
    this.manipulate_data_descriptor(this.resource.resource_group.dataDescriptor);
  }

  ngOnInit(): void {
  }

  manipulate_data_descriptor(obj) {
    let arr = [];
    let keys = Object.keys(obj);
    keys.forEach((a,i)=>{
      let o = { key: a, ...obj[a] };
      arr.push(o);
    });
    this.data_descriptor = arr;
    this.data_descriptor.forEach((a,i)=>{
      this.data_descriptor[i] = this.convert_obj_array_of_objs(a);
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

}
