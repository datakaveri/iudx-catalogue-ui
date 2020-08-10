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
  constructor(
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.constantService.get_filter().subscribe((val) => {
      this.show_filter = val;
    });
  }

  body: {
    tags: [];
    resource_groups: [];
    providers: [];
  };
  results: any;
  showContainer: boolean = false;
  drawnItems: FeatureGroup = featureGroup();
  options = {
    layers: [
      tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '<span id="map_attr">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a><br>' +
            '</span>',
        }
      ),
    ],
    zoom: 13,
    center: latLng({ lat: 12.9716, lng: 77.5946 }),
  };

  drawOptions = {
    position: 'topleft',
    draw: {
      marker: false,
      // marker: {
      //   icon: icon({
      //     iconSize: [25, 41],
      //     iconAnchor: [13, 41],
      //     iconUrl: 'assets/marker-icon.png',
      //     iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
      //     shadowUrl: 'a0c6cc1401c107b501efee6477816891.png',
      //   }),
      // },
      // circle: true,
    },
    edit: {
      featureGroup: this.drawnItems,
    },
  };

  // drawLocal: any = {
  //   draw: {
  //     toolbar: {
  //       buttons: {
  //         polygon: 'Draw an awesome polygon!',
  //         circle: false,
  //         marker: false,
  //       },
  //     },
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
}
