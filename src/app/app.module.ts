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
import { ItemListComponent } from './item-list/item-list.component';
import { MapViewComponent } from './map-view/map-view.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NotifierComponent } from './notifier/notifier.component';
import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    ItemListComponent,
    MapViewComponent,
    PaginationComponent,
    HomeComponent,
    LoaderComponent,
    NotifierComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
