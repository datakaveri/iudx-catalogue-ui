import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  NgZone,
} from '@angular/core';

import { ConstantsService } from '../constants.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as L from 'leaflet';
import { featureGroup, FeatureGroup, latLng, Map, tileLayer } from 'leaflet';
import { InterceptorService } from '../interceptor.service';

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
  selector: 'app-item-gs-map',
  templateUrl: './item-gs-map.component.html',
  styleUrls: ['./item-gs-map.component.scss'],
})
export class ItemGsMapComponent implements OnInit {
  overlay: boolean;
  showPopup: boolean;

  map: Map;
  drawnItems: FeatureGroup = featureGroup();
  options: any;
  drawOptions: any;
  resources: any;
  resource: any;
  accessPolicy: string;
  access: Boolean;
  markersLayer = new L.FeatureGroup(null);
  city: any;
  map_geometry: any;
  results: any;
  map_label: any;

  constructor(
    private constant: ConstantsService,
    private interceptorService: InterceptorService,
    private location: Location,
  ) {
    this.showPopup = true;
    this.overlay = true;
    this.results=[];
    this.resource = this.constant.get_resource_details();
    this.map_geometry = this.constant.get_map_coordinates();
    // console.log(this.map_geometry);
    this.city = this.constant.get_city();
    // console.log(this.city);
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
              '</span>'
              //  +
              // '<div class="icons-font"> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> ',
          }
        ),
      ],
      zoom: 12,
      center: latLng({
        lng: this.city.coordinates[1],
        lat: this.city.coordinates[0],
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
    let isName : Boolean;
    this.interceptorService.get_api_resource_server('https://rs.iudx.org.in/ngsi-ld/v1/entities?id='+this.map_geometry[0]+'&q=id=='+this.map_geometry[0])
    .then((data:any)=>{
      this.results = data.results;
      for (let i=0;i<this.results.length;i++) {
       if (this.results[i].location) {
        var lng = this.results[i].location.coordinates[0];
        var lat = this.results[i].location.coordinates[1];
        if(this.results[i].name){
          isName = true;
        }
        else isName = false;
        const markers = L.marker([lat, lng], {
          icon: this.getMarkerIcon()}).bindPopup(isName ?
          `<div id="name"> <p style='font-weight:bold'> `
           +  this.results[i].name +
            `</p> </div> <div class = "text-centre"><p>Address: ` +
            this.results[i].address +
           `</p> </div>`
            :`<div id="name"> <p style='font-weight:bold'> `
            +  this.results[i].depot_name +
             `</p> </div>
       `);
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
      } 
    }
    })
    
  }

  getMarkerIcon() {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${'#1c699d'} width="48px" height="48px" outline="5px solid white"><path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2-1.12-2-2s1.12-2 2-2 2 1.12 2 2-1.12 2-2 2z" opacity="1" stroke="white" stroke-width="0.5" /><circle cx="12" cy="9.5" r="2" fill="white"/></svg>
      `
    });
  }
  hideMapData() {
    this.location.back();
  }
}
