import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {DatasetListComponent} from './dataset-list/dataset-list.component';
import {MapViewComponent} from './map-view/map-view.component';
import {HomeComponent} from './home/home.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {ItemDataDesComponent} from './item-data-des/item-data-des.component';
import {ItemResItemsComponent} from './item-res-items/item-res-items.component';
import {DatasetComponent} from './dataset/dataset.component';
import {ItemMapComponent} from './item-map/item-map.component';
import {SampleDataComponent} from './sample-data/sample-data.component';
import {LatestDataComponent} from './latest-data/latest-data.component';
import { ItemGsMapComponent } from './item-gs-map/item-gs-map.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
    ],
  },
  {
    path: 'search',
    component: SearchResultsComponent,
    children: [
      {
        path: 'datasets',
        component: DatasetListComponent,

      },
      {
        path: 'dataset',
        component: DatasetComponent,
        children: [
          {
            path: 'details',
            component: ItemDetailsComponent,
          },
          {
            path: 'data-descriptors',
            component: ItemDataDesComponent,
          },
          {
            path: 'items',
            component: ItemResItemsComponent,
            children: [
              {
                path: 'latest-data',
                component: LatestDataComponent,
              },
              {
                path: 'sample-data',
                component: SampleDataComponent,
              },
              {
                path: 'map-gs',
                component: ItemGsMapComponent
              },

            ],
          },
          {
            path: 'map-view',
            component: ItemMapComponent,
            children: [
              {
                path: 'latest-data',
                component: LatestDataComponent,
              },
              {
                path: 'sample-data',
                component: SampleDataComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'map',
        component: MapViewComponent,
        children: [
          {
            path: 'latest-data',
            component: LatestDataComponent,
          },
          {
            path: 'sample-data',
            component: SampleDataComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
