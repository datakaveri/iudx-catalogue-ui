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
  constructor(
    private constant: ConstantsService
  ) {
    this.resource = this.constant.get_resource_details();
    this.texts = this.constant.get_nomenclatures();
  }

  ngOnInit(): void {
  }

}
