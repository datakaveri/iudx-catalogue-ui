import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {
  data: any = [];
  popup_type: string = '';
  popup_status: boolean = false;
  descriptor_items: boolean;
  showDescriptor: boolean;
  data_descriptor: any;
  flags: Array<Boolean>;
  resource: any;
  sampleData: any;
  resourceAuthControlLevel: string;
  texts: any;
  label: any;

  constructor(private global: GlobalService) {
    this.descriptor_items = false;
    this.showDescriptor = false;
    this.flags = [];
    this.resource = this.global.get_resource_details();
    this.sampleData = this.resource.dataset.dataSample;

    this.resourceAuthControlLevel = this.resource.dataset.resourceAuthControlLevel;
    this.texts = this.global.get_nomenclatures();

  }

  ngOnInit(): void {
    if (this.resource.dataset.hasOwnProperty('dataDescriptor')) {
      this.manipulate_data_descriptor(
        this.resource.dataset.dataDescriptor
      );
      this.descriptor_items = false;
    } else {
      this.descriptor_items = true;
    }
  }

  manipulate_data_descriptor(obj: any) {
    let arr: any = [];
    let keys = Object.keys(obj);
    keys.forEach((a: any, i) => {
      if (typeof obj[a] == 'object' && a != 'dataDescriptorLabel' && a != 'type') {
        let o = {key: a, ...obj[a]};
        arr.push(o);
      }
    });

    this.data_descriptor = arr;
    this.flags.length = this.data_descriptor.length;
    this.data_descriptor.forEach((a: any, i: number) => {
      this.data_descriptor[i] = this.convert_obj_array_of_objs(a);
      this.flags[i] = false;
    });
  }

  convert_obj_array_of_objs(obj: any) {
    let keys = Object.keys(obj);
    let arr: any = [];
    keys.forEach((a, i) => {
      if (a != 'type') {
        let data;
        if (typeof obj[a] == 'string') {
          data = {
            key: a,
            value: obj[a].includes(':') ? obj[a].split(':')[1] : obj[a],
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

  typeOf(value: any) {
    return typeof value;
  }

  toggle(i: any) {
    this.flags[i] = !this.flags[i];
  }

  showDataDescriptor(val: any) {
    this.showDescriptor = true;
    this.manipulate_data_descriptor(val);
    this.label = val.dataDescriptorLabel;
  }

  openSampleData(data: any) {
    if (data) {
      this.global.set_resource_item(data);
      window.open(data, '_blank');
    } else {
      this.global.set_resource_item(this.sampleData);
    }
    this.global.set_popup(true, 'sample-data');
  }

  downloadData(data: any) {
    if(data.includes('.mp4')){
      this.global.set_resource_item(data);
      this.global.set_popup(true, 'sample-video');

    }
    else{
      window.open(data, '_blank');
    }
  
  }

  downloadJson(myJson: any) {
    var sJson = JSON.stringify(myJson);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "sampleData.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  openLatestData(id: any) {
    if (id) {
      this.global.set_item_id(id);
    }
    this.global.set_data_type(this.resource.dataset.accessPolicy);
    this.global.set_popup(true, 'latest-data');
  }

  copy(id: string) {
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.global.set_toaster(
      'success',
      this.texts.resource_items + ' ID copied to Clipboard.'
    );
  }

  mapView(id: any, label: any) {
    this.global.set_map_coordinates(id, label);
    this.global.set_popup(true, 'gs-map')
  }
}
