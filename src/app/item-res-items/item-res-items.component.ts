import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-item-res-items',
  templateUrl: './item-res-items.component.html',
  styleUrls: ['./item-res-items.component.scss']
})
export class ItemResItemsComponent implements OnInit {
  resource: any;
  texts: any;
  resourceAuthControlLevel: string;
  constructor(
    private constant: ConstantsService
  ) { 
    this.resource = this.constant.get_resource_details();
    this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.texts = this.constant.get_nomenclatures();
  }

  ngOnInit(): void {
  }

}
