import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MapViewComponent } from './map-view/map-view.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'advanced-search',
        component: AdvancedSearchComponent
      }
    ]
  },
  {
    path: 'search',
    component: SearchResultsComponent,
    children: [
      {
        path: '',
        redirectTo: 'datasets',
        pathMatch: 'full'
      },
      {
        path: 'datasets',
        component: DatasetListComponent
      },
      {
        path: 'items',
        component: ItemListComponent
      },
      {
        path: 'map',
        component: MapViewComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
