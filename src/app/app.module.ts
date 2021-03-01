import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { DatasetFiltersComponent } from './dataset-filters/dataset-filters.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { FooterComponent } from './footer/footer.component';
import { DatasetDetailsComponent } from './dataset-details/dataset-details.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourcesMapComponent } from './resources-map/resources-map.component';
import { SampleDataComponent } from './sample-data/sample-data.component';
import { LatestDataComponent } from './latest-data/latest-data.component';
import { GeoQueryComponent } from './geo-query/geo-query.component';
import { GeoQueryFiltersComponent } from './geo-query-filters/geo-query-filters.component';
import { ToasterComponent } from './toaster/toaster.component';
import { LoaderComponent } from './loader/loader.component';
import { ChangeCityComponent } from './change-city/change-city.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { AlertComponent } from './alert/alert.component';
import { GsMapComponent } from './gs-map/gs-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MenuComponent,
    HeaderComponent,
    DatasetFiltersComponent,
    DatasetsComponent,
    FooterComponent,
    DatasetDetailsComponent,
    ResourcesListComponent,
    ResourcesMapComponent,
    SampleDataComponent,
    LatestDataComponent,
    GeoQueryComponent,
    GeoQueryFiltersComponent,
    ToasterComponent,
    LoaderComponent,
    ChangeCityComponent,
    AlertComponent,
    GsMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule,
    LeafletDrawModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
