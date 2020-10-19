import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-res-items',
  templateUrl: './item-res-items.component.html',
  styleUrls: ['./item-res-items.component.scss'],
})
export class ItemResItemsComponent implements OnInit {
  resource: any;
  sampleData: any;
  texts: any;
  data_descriptor: any;
  resourceAuthControlLevel: string;
  showPopup: boolean;
  overlay: any;
  flags: Array<Boolean>;
  showDescriptor: boolean;
  descriptor_items: boolean;
  label: any;
  showMapPopup: boolean;
  constructor(private constant: ConstantsService, private router: Router) {
    this.descriptor_items = false;
    this.showDescriptor = false;
    this.flags = [];
    this.resource = this.constant.get_resource_details();
    this.sampleData = this.resource.resource_group.dataSample;

    this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.texts = this.constant.get_nomenclatures();
    this.overlay = false;
    this.showPopup = false;
    this.showMapPopup = false;
  }

  ngOnInit(): void {
    if (this.resource.resource_group.hasOwnProperty('dataDescriptor')) {
      this.manipulate_data_descriptor(
        this.resource.resource_group.dataDescriptor
      );
      this.descriptor_items = false;
    } else {
      this.descriptor_items = true;
    }
  }

  manipulate_data_descriptor(obj) {
    console.log(obj);
    let arr = [];
    let keys = Object.keys(obj);
    console.log(keys);
    keys.forEach((a, i) => {
      // if (typeof obj[a] == 'object' && a != '@context' && a != 'type' && a != 'id' && a != 'name' && a != 'description' && a != 'label' && a != 'dataDescriptorLabel'
      if (typeof obj[a] == 'object' && a != 'dataDescriptorLabel') {
        let o = { key: a, ...obj[a] };
        arr.push(o);
      }
    });

    this.data_descriptor = arr;
    this.flags.length = this.data_descriptor.length;
    this.data_descriptor.forEach((a, i) => {
      this.data_descriptor[i] = this.convert_obj_array_of_objs(a);
      this.flags[i] = false;
    });
  }

  convert_obj_array_of_objs(obj) {
    let keys = Object.keys(obj);
    let arr = [];
    keys.forEach((a, i) => {
      if (a != 'type') {
        let data;
        if (typeof obj[a] == 'string') {
          data = {
            key: a,
            value: obj[a].includes(':') ? obj[a].split(':')[1] : obj[a],
            // level: 1
          };
        } else if (typeof obj[a] == 'number') {
          data = {
            key: a,
            value: obj[a],
            level: 1,
          };
        } else if (typeof obj[a] == 'object') {
          data = {
            key: a,
            value: this.convert_obj_array_of_objs(obj[a]),
          };
        }
        arr.push(data);
      }
    });
    return arr;
  }

  typeOf(value) {
    return typeof value;
  }

  toggle(i) {
    this.flags[i] = !this.flags[i];
  }

  showLatestData(id) {
    if (id) {
      this.constant.set_item_id(id);
    }
    this.router.navigate(['/search/dataset/items/latest-data']);
  }
  showDataDescriptor(val: any) {
    this.showDescriptor = true;
    this.manipulate_data_descriptor(val);
    this.label = val.dataDescriptorLabel;
  }

  copy(id) {
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.constant.set_toaster(
      'success',
      this.texts.resource_items + ' ID copied to Clipboard.'
    );
  }

  showSampleData(data) {
    if (data) {
      this.constant.set_resource_item(data);
    } else {
      this.constant.set_resource_item(this.resource.resource_group.dataSample);
    }
    this.router.navigate(['/search/dataset/items/sample-data']);
  }
  mapView(data) {
    console.log(data);
    // if (data.location) {
      this.constant.set_map_coordinates(data);
    // }
    // this.router.navigate(['/search/dataset/map-view']);
    this.router.navigate(['/search/dataset/items/map-gs']);
  }
}
