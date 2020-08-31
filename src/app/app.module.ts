import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { ChangeCityComponent } from './change-city/change-city.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { MapViewComponent } from './map-view/map-view.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NotifierComponent } from './notifier/notifier.component';
import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDataDesComponent } from './item-data-des/item-data-des.component';
import { ItemResItemsComponent } from './item-res-items/item-res-items.component';
import { DatasetComponent } from './dataset/dataset.component';
import { ItemMapComponent } from './item-map/item-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    AdvancedSearchComponent,
    ChangeCityComponent,
    SearchResultsComponent,
    DatasetListComponent,
    MapViewComponent,
    PaginationComponent,
    HomeComponent,
    LoaderComponent,
    NotifierComponent,
    AlertComponent,
    ItemDetailsComponent,
    ItemDataDesComponent,
    ItemResItemsComponent,
    DatasetComponent,
    ItemMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    LeafletDrawModule,
    LeafletMarkerClusterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
