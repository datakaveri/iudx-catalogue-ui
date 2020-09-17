import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-res-items',
  templateUrl: './item-res-items.component.html',
  styleUrls: ['./item-res-items.component.scss']
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
  descriptor_items : boolean;
  label: any;
  constructor(
    private constant: ConstantsService,
    private router: Router
  ) {
   
    this.descriptor_items = false;
    this.showDescriptor = false;
    this.flags = [];
    this.resource = this.constant.get_resource_details();
    this.sampleData = this.resource.resource_group.dataSample;
    
    this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.texts = this.constant.get_nomenclatures();
    this.overlay = false;
    this.showPopup = false;
  }

  ngOnInit(): void {
    if(this.resource.resource_group.hasOwnProperty('dataDescriptor')){
      this.manipulate_data_descriptor(this.resource.resource_group.dataDescriptor);
      this.descriptor_items = false;
     
    }
    else{
      this.descriptor_items = true;
    }
  }

  manipulate_data_descriptor(obj) {
<<<<<<< HEAD
=======
    //  console.log(obj);
>>>>>>> 3933d802b0523a2f9b5346bac4156a9d32d42604
    let arr = [];
    let keys = Object.keys(obj);
    keys.forEach((a,i)=>{
      if(a != '@context' && a != 'type'&& a != 'id' &&a != 'name'&& a != 'description' && a != 'label' && a != 'dataDescriptorLabel'){
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

  showLatestData(){
    this.router.navigate(['/search/dataset/items/latest-data']);
  }
  showDataDescriptor(val: any){
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
    alert(this.texts.resource_items + ' ID copied to Clipboard.');
  }

  showSampleData(){
    this.router.navigate(['/search/datasets/sample-data']);
  }
}
