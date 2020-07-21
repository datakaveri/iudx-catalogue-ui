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
} from 'leaflet';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent {
  showContainer: boolean = false;
  drawnItems: FeatureGroup = featureGroup();
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Open Street Map',
      }),
    ],
    zoom: 13,
    center: latLng({ lat: 12.9716, lng: 77.5946 }),
  };

  drawOptions = {
    position: 'topright',
    draw: {
      marker: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: './assets/marker.png',
          iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
          shadowUrl: 'a0c6cc1401c107b501efee6477816891.png',
        }),
      },
    },
    edit: {
      featureGroup: this.drawnItems,
    },
  };

  drawLocal: any = {
    draw: {
      toolbar: {
        buttons: {
          polygon: 'Draw an awesome polygon!',
        },
      },
    },
  };

  public onDrawCreated(e: any) {
    // tslint:disable-next-line:no-console
    console.log('Draw Created Event!');

    const layer = (e as DrawEvents.Created).layer;
    this.drawnItems.addLayer(layer);
  }

  public onDrawStart(e: any) {
    // tslint:disable-next-line:no-console
    console.log('Draw Started Event!');
  }
}
