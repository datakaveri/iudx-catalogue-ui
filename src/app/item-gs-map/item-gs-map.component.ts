import {Component, OnInit, Output, EventEmitter, ElementRef, NgZone} from '@angular/core';

import {ConstantsService} from '../constants.service'
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import * as L from "leaflet";
import {featureGroup, FeatureGroup, latLng, Map, tileLayer} from "leaflet";


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
  styleUrls: ['./item-gs-map.component.scss']
})
export class ItemGsMapComponent implements OnInit {
  mapData: any;
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
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  markerClusterGroup: L.MarkerClusterGroup;
  city: any;
  map_geometry: any;

  constructor(
    private constant: ConstantsService,
    private router: Router,
    private location: Location,
    private elementRef: ElementRef,
    public ngZone: NgZone
  ) {
    this.showPopup = true;
    this.overlay = true;
    this.mapData = this.constant.get_map_coordinates();
    this.resource = this.constant.get_resource_details();
    this.accessPolicy = this.resource.resource_group.accessPolicy;
    this.resources = this.constant.get_resource_details().items;
    this.map_geometry = this.constant.get_map_coordinates();
    if (this.accessPolicy == 'OPEN') {
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
    // console.log(this.map_geometry);
    if (this.map_geometry) {
      var lng = this.map_geometry.location.coordinates[0];
      var lat = this.map_geometry.location.coordinates[1];
      const markers = L.marker([lat, lng], {
        icon: this.getMarkerIcon(this.resource.resource_group),
      }).bindPopup(this.map_geometry.depot_name);
      this.markersLayer.addLayer(markers);
      this.markersLayer.addTo(this.map);
    }
    for (const c of this.resources) {
      let isPublic: Boolean;
      if (this.accessPolicy == 'OPEN') {
        isPublic = true;
      } else {
        isPublic = false;
      }
      if (c.location.geometry.type == 'Point') {
        var lng = c.location.geometry.coordinates[0];
        var lat = c.location.geometry.coordinates[1];

        const markers = L.marker([lat, lng], {
          icon: this.getMarkerIcon(this.resource.resource_group),
        }).bindPopup(
          `<div id="name"> <p style='font-weight:bold'>` +
          c.name +
          `</p> </div>
          <div class = "text-centre"> <p>` +
          this.resource.resource_group.description +
          `</p><p>Group: ` +
          c.resourceGroup.split('/')[3] +
          `</p> </div>
          <div id="pop_up_` +
          c.id +
          `"> <p class="text-center" style='padding-right:2px'> </p>` +
          (isPublic
            ? `<a  class="data-link" data-Id=` +
            c.id +
            ` style="color: var(--highlight); font-weight:bold;"> Get Latest Data </a>`
            : `<a  class="sample-link" data-Id=` +
            c.id +
            ` style="color: var(--highlight); font-weight:bold;"> Get Sample Data </a>&nbsp;&nbsp; ` +
            `<a style="color: var(--error); font-weight:bold;"> Request Access </a><br>` +
            `</div>`)
        );
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
        let self = this;
        markers.on('popupopen', function () {
          if (isPublic) {
            self.elementRef.nativeElement
              .querySelector('.data-link')
              .addEventListener('click', (e) => {
                // this.layer.closePopup();
                var dataId = e.target.getAttribute('data-Id');
                self.display_latest_data(dataId);
              });
          } else {
            self.elementRef.nativeElement
              .querySelector('.sample-link')
              .addEventListener('click', (e) => {
                var dataId = e.target.getAttribute('data-Id');
                self.display_sample_data(dataId);
              });
          }
        });
      } else if (c.location.geometry.type == 'Polygon') {

        var points = c.location.geometry.coordinates[0];
        // console.log(points);
        // console.log(c.resourceGroup.split('/')[3]);

        // console.log(c.location.geometry);
        L.geoJSON((c.location.geometry), {
          style: {
            fillColor: '#0ea3b1',
            weight: 2,
            opacity: 1,
            // color: 'white',
            //  dashArray: '3',
            fillOpacity: 0.5
          }

        }).addTo(this.map);
      }
    }
  }

  display_latest_data(id) {
    this.ngZone.run(() => {
      this.router.navigate(['/search/dataset/map-view/latest-data']);
    });
  }

  display_sample_data(id) {
    this.ngZone.run(() => {
      this.router.navigate(['/search/dataset/map-view/sample-data']);
    });
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

  hideSampleData() {
    this.location.back();
  }

}
