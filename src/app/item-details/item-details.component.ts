import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  resource: any;
  texts: any;
  schema_url: string;
  constructor(
    private constant: ConstantsService
  ) {
    this.resource = this.constant.get_resource_details();
    this.texts = this.constant.get_nomenclatures();
    this.schema_url = this.resource.resource_group['@context'] + this.resource.resource_group.type[1].split('iudx:')[1];
  }

  ngOnInit(): void {
  }

}
