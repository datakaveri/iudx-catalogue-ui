import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {DatasetsComponent} from './datasets/datasets.component';
import {DatasetDetailsComponent} from './dataset-details/dataset-details.component';
import {ResourcesListComponent} from './resources-list/resources-list.component';
import {ResourcesMapComponent} from './resources-map/resources-map.component';
import {GeoQueryComponent} from './geo-query/geo-query.component';
import {LatestDataComponent} from "./latest-data/latest-data.component";
import {SampleDataComponent} from "./sample-data/sample-data.component";
import { ChangeCityComponent } from './change-city/change-city.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'datasets',
    component: DatasetsComponent
  },
  {
    path: 'dataset-details/:id',
    component: DatasetDetailsComponent,
    children: [
      {
        path: 'resources',
        component: ResourcesListComponent
      },
      {
        path: 'map',
        component: ResourcesMapComponent
      }
    ]
  },
  {
    path: 'geo-query',
    component: GeoQueryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
