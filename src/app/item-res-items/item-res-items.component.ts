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
  texts: any;
  resourceAuthControlLevel: string;
  showPopup: boolean;
  overlay: any;

  constructor(
    private constant: ConstantsService,
    private router: Router
  ) {
    this.resource = this.constant.get_resource_details();
    this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.texts = this.constant.get_nomenclatures();
    this.overlay = false;
    this.showPopup = false;
  }

  ngOnInit(): void {
  }

  showLatestData(){
    this.router.navigate(['/search/dataset/items/latest-data']);
  }
}
