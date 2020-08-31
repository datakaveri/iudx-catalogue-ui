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
  access: boolean;
  markersLayer = new L.FeatureGroup(null);
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  markerClusterGroup: L.MarkerClusterGroup;
  city: any;
  constructor(private constant: ConstantsService,private elementRef: ElementRef,private router:Router) {
    this.resource = this.constant.get_resource_details();
    console.log(this.resource);

    this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.resources = this.constant.get_resource_details().items;
    if (this.resourceAuthControlLevel == 'OPEN') {
      this.access = true;
    } else {
      this.access = false;
    }
    this.city = this.constant.get_city();
    // this.getMapData();
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
      console.log(c);
      console.log(this.resource);

      var lng = c.location.geometry.coordinates[0];
      var lat = c.location.geometry.coordinates[1];
      console.log(this.resourceAuthControlLevel);
      if (this.resourceAuthControlLevel == 'OPEN') {
        const markers = L.marker([lat, lng]).bindPopup(
          `<div id="name"> <p style='font-weight:bold'>` + c.name + `</p> </div> <p>Desc: ` + this.resource.resource_group.description + `</p> <div id="pop_up_` + c.id + `"> <p class="text-center " style='padding-right:2px'> </p>` + `<a style='color: var(--highlight); font-weight:bold;' (click)="display_latest_data($event, ` + c.items + `, ` + c.id + `)"> Get Latest Data </a> <br>` + `</div>`
        );
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
        // data.push(markers);
        // this.markerClusterData = data;
      } else {
        const markers = L.marker([lat, lng]).bindPopup(
          `<div id="name"> <p style='font-weight:bold'>` + c.name + `</p> </div> <div class = "text-centre"> <p>Desc: ` + this.resource.resource_group.description + `</p> </div> <div id="pop_up_` + c.id + `"> <p class="text-center " style='padding-right:2px'> </p>` + `<a style='color: var(--highlight); font-weight:bold;' (click)="display_sample_data($event, ` + c.items + `, ` + c.id + `)"> Get Sample Data </a>&nbsp;&nbsp;`+`<a style='color: var(--error); font-weight:bold;' (click)="display_latest_data($event, ` + c.items + `, ` + c.id + `)"> Request Access </a> <br>` + `</div>`
        );
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
        // data.push(markers);
        // this.markerClusterData = data;
      }
    }
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }
}
