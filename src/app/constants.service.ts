import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  resource_groups: string;
  resource_items: string;
  providers: string;
  constructor() {
    this.resource_groups = 'Datasets';
    this.resource_items = 'Resources';
    this.providers = 'Publishers';
  }
  
  get_nomenclatures() {
    return {
      resource_groups: this.resource_groups,
      resource_items: this.resource_items,
      providers: this.providers
    }
  }
}
