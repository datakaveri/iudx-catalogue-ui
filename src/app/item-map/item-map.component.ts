import { Component, OnInit, ElementRef } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { latLng, tileLayer, FeatureGroup, Map, featureGroup } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet.markercluster';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Router } from '@angular/router';

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
  styleUrls: ['./item-map.component.scss'],
})
export class ItemMapComponent implements OnInit {
  map: Map;
  drawnItems: FeatureGroup = featureGroup();
  options: any;
  drawOptions: any;
  resources: any;
  resource: any;
  resourceAuthControlLevel: string;
  access: Boolean;
  markersLayer = new L.FeatureGroup(null);
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  markerClusterGroup: L.MarkerClusterGroup;
  city: any;
  constructor(private constant: ConstantsService,private elementRef: ElementRef,private router:Router) {
    this.resource = this.constant.get_resource_details();
    this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.resources = this.constant.get_resource_details().items;
    if (this.resourceAuthControlLevel == 'OPEN') {
      this.access = true;
    } else {
      this.access = false;
    }
    this.city = this.constant.get_city();
  }

  ngOnInit(): void {
    this.options = this.initMap();
    this.drawOptions = this.drawOptionsInit();
  }
  onMapReady(map: Map) {
    this.map = map;
    this.getMapData();
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
      center: latLng({
        lng: this.city.configurations.map_default_view_lat_lng[1],
        lat: this.city.configurations.map_default_view_lat_lng[0],
      }),
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
      if (this.resourceAuthControlLevel == 'OPEN') {
        const markers = L.marker([lat, lng], {
          icon: this.getMarkerIcon(this.resource.resource_group),
        }).bindPopup(
          `<div id="name"> <p style='font-weight:bold'>` +
            c.name +
            `</p> </div> <p>Desc: ` +
            this.resource.resource_group.description +
            `</p> <div id="pop_up_` +
            c.id +
            `"> <p class="text-center " style='padding-right:2px'> </p>` +
            `<a style='color: var(--highlight); font-weight:bold;' (click)="display_latest_data($event, ` +
            c.items +
            `, ` +
            c.id +
            `)"> Get Latest Data </a> <br>` +
            `</div>`
        );
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
        // data.push(markers);
        // this.markerClusterData = data;
      } else {
        const markers = L.marker([lat, lng], {
          icon: this.getMarkerIcon(this.resource.resource_group),
        }).bindPopup(
          `<div id="name"> <p style='font-weight:bold'>` +
            c.name +
            `</p> </div> <div class = "text-centre"> <p>Desc: ` +
            this.resource.resource_group.description +
            `</p> </div> <div id="pop_up_` +
            c.id +
            `"> <p class="text-center " style='padding-right:2px'> </p>` +
            `<a style='color: var(--highlight); font-weight:bold;' (click)="display_sample_data($event, ` +
            c.items +
            `, ` +
            c.id +
            `)"> Get Sample Data </a>&nbsp;&nbsp;` +
            `<a style='color: var(--error); font-weight:bold;' (click)="display_latest_data($event, ` +
            c.items +
            `, ` +
            c.id +
            `)"> Request Access </a> <br>` +
            `</div>`
        );
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
        // data.push(markers);
        // this.markerClusterData = data;
      }
    }
  }
  getMarkerIcon(_rsg) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: this.getColor(_rsg),
    });
  }
  getColor(id) {
    let index = 0;
    // for (let i = 0; i < this.resource.resource_group.length; i++) {
    //   if (this.resource.resource_groups[i] == id) {
    //     index = i;
    //     break;
    //   }
    // }
    var pathFillColor = [
      '#1c699d',
      // '#ff7592',
      // '#564d65',
      // '#2fcb83',
      // '#0ea3b1',
      // '#f39c1c',
      // '#d35414',
      // '#9b59b6',
    ];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${pathFillColor[index]} width="48px" height="48px" outline="5px solid white"><path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2-1.12-2-2s1.12-2 2-2 2 1.12 2 2-1.12 2-2 2z" opacity="1" stroke="white" stroke-width="0.5" /><circle cx="12" cy="9.5" r="2" fill="white"/></svg>
    `;
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }
}
