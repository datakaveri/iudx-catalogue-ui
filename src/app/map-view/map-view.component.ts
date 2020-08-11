import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Component, OnInit } from '@angular/core';
import {
  latLng,
  tileLayer,
  FeatureGroup,
  DrawEvents,
  icon,
  Map,
  Control,
  map,
  circle,
  polygon,
  layerGroup,
  featureGroup,
  Marker,
} from 'leaflet';
import * as L from 'leaflet';
import { InterceptorService } from '../interceptor.service';
import { ConstantsService } from '../constants.service';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent {
  private map;
  show_filter: boolean;
  options: any;
  drawOptions: any;
  text: string;
  body: any;
  resource_groups: any;
  results: any;
  tags: any;
  providers: [];
  pages: number;
  searchQuery: {};
  // text: string;
  // tags: string;
  // searchQuery: {};

  constructor(
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.constantService.get_filter().subscribe((val) => {
      this.show_filter = val;
    });
    this.body = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
      resource_groups: [],
    };
  }
  ngOnInit(): void {
    this.options = this.initMap();
    this.getMapData();
    this.drawOptions = this.drawOptionsInit();
  }
  // body: {
  //   text: '';
  //   tags: ['air'];
  //   resource_groups: [];
  //   providers: [];
  // };
  // results: any;
  showContainer: boolean = false;
  drawnItems: FeatureGroup = featureGroup();

  // drawOptions = {
  //   position: 'topleft',
  //   draw: {
  //     marker: false,
  //   },
  //   edit: {
  //     featureGroup: this.drawnItems,
  //   },
  // };

  onDrawCreated(e: any) {
    console.log('Draw Created Event!');

    const layer = (e as DrawEvents.Created).layer;
    this.drawnItems.addLayer(layer);
  }

  onDrawStart(e: any) {
    console.log('Draw Started Event!');
  }

  getMapData() {
    this.tags = this.body.tags;
    this.providers = this.body.providers;
    this.resource_groups = this.body.resource_groups;
    this.pages = this.body.page;
    this.body = this.getBody(
      this.text,
      this.tags,
      this.resource_groups,
      this.providers,
      this.pages
    );
    this.httpInterceptor
      .post_api('customer/map', this.body)
      .then((response: any) => {
        this.results = response;
        // console.log(this.results);
        for (const c of response.items) {
          const lng = c.location.geometry.coordinates[0];
          const lat = c.location.geometry.coordinates[1];
          console.log('lat:' + lat, 'long:' + lng);
          const marker = L.marker([lat, lng]).addTo(this.map);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  closeFilter() {
    this.show_filter = false;
  }

  getBody(_text, _tags, _resource_groups, _providers, _page) {
    this.body = {
      text: _text,
      tags: _tags,
      resource_groups: _resource_groups,
      providers: _providers,
      page: _page,
    };
    return this.body;
  }

  initMap() {
    var map_options = {
      layers: [
        tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            attribution:
              '<span id="map_attr">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a><br>' +
              '</span>',
          }
        ),
      ],
      zoom: 13,
      center: latLng({ lng: 73.836808, lat: 18.5727 }),
    };

    return map_options;
  }

  // drawOptions = {
  //   position: 'topleft',
  //   draw: {
  //     marker: false,
  //     // marker: {
  //     //   icon: icon({
  //     //     iconSize: [25, 41],
  //     //     iconAnchor: [13, 41],
  //     //     iconUrl: 'assets/marker-icon.png',
  //     //     iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
  //     //     shadowUrl: 'a0c6cc1401c107b501efee6477816891.png',
  //     //   }),
  //     // },
  //     // circle: true,
  //   },
  //   edit: {
  //     featureGroup: this.drawnItems,
  //   },
  // };

  drawOptionsInit() {
    var draw_options = {
      position: 'topleft',
      draw: {
        marker: false,
        circle: false,
      },
      edit: {
        featureGroup: this.drawnItems,
      },
    };
    return draw_options;
  }
}
