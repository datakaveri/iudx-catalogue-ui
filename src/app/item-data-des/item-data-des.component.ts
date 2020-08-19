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
  constructor(
    private constant: ConstantsService
  ) { 
    this.resource = this.constant.get_resource_details();
    this.texts = this.constant.get_nomenclatures();
  }

  ngOnInit(): void {
  }

}
