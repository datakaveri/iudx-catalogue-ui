import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

import { latLng, tileLayer, FeatureGroup, Map, featureGroup } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet.markercluster';
// import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Router } from '@angular/router';

// const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  // iconRetinaUrl,
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
  selector: 'app-resources-map',
  templateUrl: './resources-map.component.html',
  styleUrls: ['./resources-map.component.scss']
})
export class ResourcesMapComponent implements OnInit {
  drawnItems: FeatureGroup = featureGroup();
  options: any;
  drawOptions: any;
  resources: any;
  resource: any;
  accessPolicy: string;
  access: Boolean;
  markersLayer = new L.FeatureGroup();
  city: any;
  map_geometry: any;
  popup_type: any;
  popup_status: any;
  constructor( private global: GlobalService,
    private elementRef: ElementRef,
    private router: Router,
    public ngZone: NgZone) { 

    this.resource = this.global.get_resource_details();
    this.accessPolicy = this.resource.resource_group.accessPolicy;
    this.resources = this.global.get_resource_details().items;
    this.map_geometry = this.global.get_map_coordinates();
    if (this.accessPolicy == 'OPEN') {
      this.access = true;
    } else {
      this.access = false;
    }
    let cities = this.global.get_cities();
    cities.forEach((a:any )=>{
      if(a.name == this.resource.resource_group.location.address.split(',')[0]) {
        // this.global.set_city(a);
        // console.log(a);
        this.city = a;
      }
    });
    // this.city = this.global.get_city();
    this.global.get_popup().subscribe((data)=> {
      this.popup_type = data.type;
      this.popup_status = data.flag;
      // console.log(this.popup_status,this.popup_type)
      });
    }

  ngOnInit(): void {
    this.options = this.initMap();
  }
  onMapReady(map: Map) {
    this.getMapData(map);
  }
  initMap() {
    var map_options = {
      layers: [
        tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 12,
            attribution:
              '<span class="icons-font" id="map_attr">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a><br>' +
              '</span>'
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

  getMapData(map: Map) {
    const container = document.getElementById('map')
    if(container) {
    // code to render map here...
      if (this.map_geometry) {
        var lng = this.map_geometry.location.coordinates[0];
        var lat = this.map_geometry.location.coordinates[1];
        const markers = L.marker([lat, lng], {
        icon: this.getMarkerIcon(this.resource.resource_group),
        }).bindPopup(this.map_geometry.depot_name);
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(map);
      }
      for (const c of this.resources) {
      let isPublic: Boolean;
      if (this.accessPolicy == 'OPEN') {
      isPublic = true;
      } 
      else {
      isPublic = false;
      }
      if (c.location.geometry.type == 'Point') {
      var lng = c.location.geometry.coordinates[0];
      var lat = c.location.geometry.coordinates[1];

      const markers = L.marker([lat, lng], {
        icon: this.getMarkerIcon(this.resource.resource_group),
      }).bindPopup(
        `<div id="name"> <p style='font-weight:bold'>` +
          c.label +
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
              c.id + ` data-rsg =`+c.resourceGroup.split('/')[3] +
              ` style="color: var(--highlight); font-weight:bold;"> Get Latest Data </a>`
            : `<a  class="sample-link" data-Id=` +
              c.id +
              ` style="color: var(--highlight); font-weight:bold;"> Get Sample Data </a>&nbsp;&nbsp; ` +
              `<a style="color: var(--error); font-weight:bold;"> Request Access </a><br>` +
              `</div>`)
      );
      this.markersLayer.addLayer(markers);
      this.markersLayer.addTo(map);
      let self = this;
      markers.on('popupopen', function () {
        if (isPublic) {
          self.elementRef.nativeElement
            .querySelector('.data-link')
            .addEventListener('click', (e: { target: { getAttribute: (arg0: string) => any; }; }) => {
              var dataId = e.target.getAttribute('data-Id');
              var dataRsg = e.target.getAttribute('data-rsg');
              self.elementRef.nativeElement
              .querySelector('.leaflet-popup-close-button').click();
              self.display_latest_data(dataId,dataRsg);
            });
        } else {
          self.elementRef.nativeElement
            .querySelector('.sample-link')
            .addEventListener('click', (e: { target: { getAttribute: (arg0: string) => any; }; }) => {
              var dataId = e.target.getAttribute('data-Id');
              self.display_sample_data(dataId);
            });
        }
      });
    } else if (c.location.geometry.type == 'Polygon') {
      var points = c.location.geometry.coordinates[0];
      L.geoJSON(c.location.geometry, {
        style: {
          fillColor: '#0ea3b1',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.5,
        },
      }).addTo(map);
    }
  }
}
}

  display_latest_data(id: any, rsg:any) {
    //  console.log(this.accessPolicy);
    this.global.set_data_type(this.accessPolicy);
    this.global.set_item_id(id);
    this.ngZone.run(() => {
      this.global.set_popup(true,'latest-data');
    });
    
  }
  display_sample_data(id: any) {
    // this.ngZone.run(() => {
    //   this.router.navigate(['/sample-data']);
    // });
  }

  getMarkerIcon(_rsg: any) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: this.getColor(_rsg),
    });
  }
  getColor(id: any) {
    let index = 0;
    var pathFillColor = [
      '#1c699d',
    ];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${pathFillColor[index]} width="48px" height="48px" outline="5px solid white"><path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2-1.12-2-2s1.12-2 2-2 2 1.12 2 2-1.12 2-2 2z" opacity="1" stroke="white" stroke-width="0.5" /><circle cx="12" cy="9.5" r="2" fill="white"/></svg>
    `;
  }
}
