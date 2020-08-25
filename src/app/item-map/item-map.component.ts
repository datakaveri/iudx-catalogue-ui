import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

import {
  latLng,
  tileLayer,
  FeatureGroup,
  Map,
  featureGroup,
} from 'leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet.markercluster';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-item-map',
  templateUrl: './item-map.component.html',
  styleUrls: ['./item-map.component.scss']
})
export class ItemMapComponent implements OnInit {
  map: Map;
  drawnItems: FeatureGroup = featureGroup();
  options: any;
  drawOptions: any;
  resources: any;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  markerClusterGroup: L.MarkerClusterGroup;
  city: any;
  constructor(
    private constant: ConstantsService
  ) {
    this.resources = this.constant.get_resource_details().items;
    this.city = this.constant.get_city();
    this.getMapData();
  }

  ngOnInit(): void {
    this.options = this.initMap();
    this.drawOptions = this.drawOptionsInit();
  }

  initMap() {
    var map_options = {
      layers: [
        tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            attribution:
              '<span class="icons-font" id="map_attr">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a><br>' +
              '</span>' +
              '<div class="icons-font"> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> ',
          }
        ),
      ],
      zoom: 12,
      center: latLng({ lng: this.city.configurations.map_default_view_lat_lng[1], lat: this.city.configurations.map_default_view_lat_lng[0] }),
    };
    return map_options;
  }
  
  drawOptionsInit() {
    var draw_options = {
      position: 'topleft',
      draw: {
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: this.drawnItems,
      },
    };
    return draw_options;
  }

  getMapData() {
    let data = [];
    for (const c of this.resources) {
      var lng = c.location.geometry.coordinates[0];
      var lat = c.location.geometry.coordinates[1];
      const markers = L.marker([lat, lng]).bindPopup( 
        `<div id="name">
        <p style='font-weight:bold'>` +
          c.name +
          `</p>
          </div>
          <div class = "text-centre">
            <p>` +
          c.description+
          `</p>
          <p>Publisher: ` +
          c.provider.name +
          `</p> 
          </div>
          <div id="pop_up_` +
          c.id +
          `">
          <p class="text-center " style='padding-right:2px'>
      </p>` +
          ` <a style='color: var(--highlight); font-weight:bold;' (click)="display_latest_data($event, ` +
          c.items +
          `, ` +
          c.id +
          `)"> View Details </a><br>` +
          `</div>`);
      data.push(markers);
      this.markerClusterData = data;
    }
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }
  
  }
