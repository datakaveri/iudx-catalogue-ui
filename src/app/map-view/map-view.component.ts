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
import { InterceptorService } from '../interceptor.service';
import { ConstantsService } from '../constants.service';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent {
  show_filter: boolean;
  options: any;
  constructor(
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.constantService.get_filter().subscribe((val) => {
      this.show_filter = val;
    });
  }
  ngOnInit(): void {
    this.options = this.initMap();
  }
  body: {
    tags: [];
    resource_groups: [];
    providers: [];
  };
  results: any;
  showContainer: boolean = false;
  drawnItems: FeatureGroup = featureGroup();

  drawOptions = {
    position: 'topleft',
    draw: {
      marker: false,
    },
    edit: {
      featureGroup: this.drawnItems,
    },
  };

  onDrawCreated(e: any) {
    console.log('Draw Created Event!');

    const layer = (e as DrawEvents.Created).layer;
    this.drawnItems.addLayer(layer);
  }

  onDrawStart(e: any) {
    console.log('Draw Started Event!');
  }

  getMapData() {
    this.httpInterceptor
      .post_api('customer/map', this.body)
      .then((response) => {
        this.results = response;
        console.log(this.results);
      });
  }
  closeFilter() {
    this.show_filter = false;
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
      center: latLng({ lat: 12.9716, lng: 77.5946 }),
    };

    return map_options;
  }
}
