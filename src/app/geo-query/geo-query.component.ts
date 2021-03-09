import {Component, OnInit, ElementRef, NgZone} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { latLng, FeatureGroup, Map, featureGroup } from 'leaflet';
import * as L from 'leaflet';

import { NetworkService } from '../network.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-geo-query',
  templateUrl: './geo-query.component.html',
  styleUrls: ['./geo-query.component.scss']
})
export class GeoQueryComponent implements OnInit {
  [x: string]: any;
  map: Map;
  markersLayer = new L.FeatureGroup();
  drawnItems: FeatureGroup = featureGroup();
  is_drawn: boolean;
  pathFillColor: string[];
  grades: any =[];
  markerValues: any=[];
  resource_items: any =[];
  filtered_resource_items: any=[];
  searchQuery: any;
  drawQuery: any ={};
  resource_groups: any;
  texts: any;
  city: any;
  options: any;
  drawOptions: any;
  data: any;
  name: string='';
  pr_detail:any = {};

  constructor(private router: Router, private global: GlobalService, private network: NetworkService, private locate : Location, private elementRef: ElementRef, public ngZone: NgZone) {
    this.searchQuery = window.sessionStorage.map_search
    ? JSON.parse(window.sessionStorage.map_search)
    : { resource_groups: [] };
    //  console.log(window.sessionStorage.map_search)
     if(this.searchQuery.resource_groups === [] || window.sessionStorage.map_search === undefined || window.sessionStorage.map_search){
      this.network.post_api('customer/map', this.searchQuery)
      .then((data: any) => {
        this.global.set_filter_rsg(data.resource_groups);
        this.global.set_popup(true,'geo-filter');
      })
    }
    this.global.get_popup().subscribe((data) => {
      if(data.flag == false && data.type == 'geo-filter'){
      this.is_drawn = false;
      this.markersLayer.clearLayers();
      this.searchQuery =  window.sessionStorage.map_search ? JSON.parse(window.sessionStorage.map_search) : { resource_groups: [] };
      this.getMapData();
      }
    });

    this.global.get_filter().subscribe((query: any) => {
      this.searchQuery = query;
      if(this.searchQuery.tags != '' || this.searchQuery.text !=''){
      this.router.navigate(['/datasets']);
      }
      
    });
    
    this.is_drawn = false;
     this.search = {
      group: '',
    };
    this.pathFillColor=[ 
      '#1c699d',
      '#ff7592',
      '#564d65',
      '#2fcb83',
      '#0ea3b1',
      '#f39c1c',
      '#d35414',
      '#9b59b6',
    ];
    this.texts = this.global.get_nomenclatures();
    this.city = this.global.get_city();
   }

  ngOnInit(): void {
    this.options = this.initMap();
    this.drawOptions = this.drawOptionsInit();
  }
  mark_on_map( ) {
    let mySet = new Set();
    for ( var i = 0; i < this.resource_groups.length; i++) {
      if (this.resource_groups[i].accessPolicy == 'OPEN') {
        mySet.add(this.resource_groups[i].id);
      }
    }
    const data: L.Marker[] = [];
    let c : any;
    for (c of this.filtered_resource_items) {
      let isPublic: Boolean;
      // Condition to check whether the geometry type is polygon or point
      if (c.location.geometry.type == 'undefined' || c.location.geometry.type == 'Point') {
        var lng = c.location.geometry.coordinates[0];
        var lat = c.location.geometry.coordinates[1];
        if (mySet.has(c.resourceGroup)) {
          isPublic = true;
        } else {
          isPublic = false;
        }
        const markers = L.marker([lat, lng], {
          icon: this.getMarkerIcon(c.resourceGroup),
        }).bindPopup(
          `<div id="name"> <p style='font-weight:bold'>` +
            c.name +
            `</p> </div>
            <div class = "text-centre"> <p>` +
            c.description +
            `</p><p>Group: ` +
            c.resourceGroup.split('/')[3] +
            `</p> </div>
            <div id="pop_up_` +
            c.id +
            `"> <p class="text-center" style='padding-right:2px'> </p>` +
            (isPublic
              ? `<a  class="data-link" data-Id=` +
                c.id +` data-rsg =`+c.resourceGroup.split('/')[3] +
                ` style="color:color: var(--highlight); font-weight:bold;"> View Latest Data </a>`
              : `<a  class="sample-link" data-Id=` +
                c.id +
                ` style="color: var(--highlight);font-weight:bold;"> Get Sample Data </a>&nbsp;&nbsp; ` +
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
              .addEventListener('click', (e: any) => {
                var dataId = e.target.getAttribute('data-Id');
                var dataRsg = e.target.getAttribute('data-rsg');
                self.elementRef.nativeElement
              .querySelector('.leaflet-popup-close-button').click();
                self.display_latest_data(dataId,dataRsg);

              });
          } else {
            self.elementRef.nativeElement
              .querySelector('.sample-link')
              .addEventListener('click', (e: any) => {
                var dataId = e.target.getAttribute('data-Id');
                self.display_sample_data(dataId);
              });
          }
        });
      } else if (c.location.geometry.type == 'undefined' || c.location.geometry.type == 'Polygon') {
        // var points = c.location.geometry.coordinates[0];
        if (mySet.has(c.resourceGroup)) {
          isPublic = true;
        } else {
          isPublic = false;
        }

        L.geoJSON(c.location.geometry, {
          style: {
            fillColor: this.stringToColour(c.resourceGroup.split('/')[3]),
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5,
          },
          onEachFeature: function (feature, layer) {
            // layer.bindTooltip(`<div><p style="font-size:20px;"><strong>`+_resourceId+`</strong></p></div>`)
                layer.on('mouseover', function(e) {
                // this.bindTooltip(`<div><p style="font-size:20px;"><strong>`+c.resourceGroup.split('/')[3]+`</strong></p></div>`)
                // this.bringToFront();
                });
                layer.on('mouseout', function(e) {
                // this.bringToBack();
                });
          },
        }).addTo(this.markersLayer);
      }
    }
  }
  onMapReady(map: Map) {
    this.map = map;
    this.getMapData();
  }
  initMap() {
    let zoom = 12;
    if(!this.city) {
      this.city = {
        coordinates: [20.5937,78.9629]
      }
      zoom = 5;
    }
    var map_options = {
      layers: [
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            attribution:
              '<span class="icons-font" id="map_attr">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a><br>' +
              '</span>' ,
              // +
              // '<div class="icons-font"> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> ',
          }
        ),
        // ,L.marker([ this.city.coordinates[0], this.city.coordinates[1]], { icon :iconDefault })
      ],
      zoom: zoom,
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
    this.filtered_resource_items = [];
    if (this.is_drawn) {
      this.network
        .post_api('customer/coordinates', this.drawQuery)
        .then((data: any) => {
          // console.log(data);
          this.is_drawn = false;
          this.resource_items = data.items;
          this.filtered_resource_items = this.resource_items;
          this.filter_map_data();
        });
    } else {
      if (this.resource_items.length > 0) {
        this.filter_data();
      } else {
        this.network
          .post_api('customer/map', this.searchQuery)
          .then((data: any) => {
            //  console.log(data);
            this.resource_items = data.items;
            this.resource_groups = data.resource_groups;
            this.global.set_filter_rsg(this.resource_groups)
            this.showLegends(this.resource_items);
            if (this.searchQuery.resource_groups.length != 0)
              this.filter_data();
          });
      }
    }
  }
  filter_data() {
    this.filtered_resource_items = [];
    this.resource_items.forEach((a: any) => {
      let flag = this.check_if_contained(
        this.searchQuery.resource_groups,
        a.resourceGroup
      );

      if (flag == true) {
        this.filtered_resource_items.push(a);
      }
    });
    this.showLegends(this.filtered_resource_items);
    this.mark_on_map();
  }
  filter_map_data() {
    this.filtered_resource_items = [];
    this.resource_items.forEach((a :any) => {
      let flag = this.check_if_contained(
        this.searchQuery.resource_groups,
        a.resourceGroup
      );
      if (flag == true) this.filtered_resource_items.push(a);
    });
    this.callGeoJsonPlot(this.filtered_resource_items);
  }
  check_if_contained(arr: string | any[], str: any) {
    return arr.includes(str);
  }

  onDrawCreated(e: any) {
    this.is_drawn = true;
    const layer = e.layer;
    this.drawnItems.clearLayers();
    var type = e.layerType;
    if (type === 'circle') {
      var geometry = 'Point';
      var types = 'intersects';
      var point = [];
      var center_point = e.layer._latlng;
      point.push(center_point['lng'], center_point['lat']);
      var radius = Math.ceil(e.layer._mRadius);
      this.markersLayer.clearLayers();
      this.api_call(point, radius, types, geometry);
    } else if (type === 'polygon') {
      var geometry = 'Polygon';
      var types = 'within';
      var radius = 0;
      var points = e.layer._latlngs[0];
      var polyPoints = [];
      points.forEach((p: { lng: any; lat: any; }) => {
        polyPoints.push([p.lng, p.lat]);
      });
      polyPoints.push([points[0].lng, points[0].lat]);
      this.markersLayer.clearLayers();
      this.api_call(polyPoints, radius, types, geometry);
    } else if (type === 'rectangle') {
      var geometry = 'bbox';
      var types = 'within';
      var radius = 0;
      var bound_points = e.layer._latlngs[0];
      var boundingPoints = [];
      boundingPoints.push([bound_points[1]['lng'], bound_points[1]['lat']]);
      boundingPoints.push([bound_points[3]['lng'], bound_points[3]['lat']]);
      //Api call for getting items for that area
      this.markersLayer.clearLayers();
      this.api_call(boundingPoints, radius, types, geometry);
    }
    this.drawnItems.addLayer(layer);
  }

  onDrawDeleted(e: any) {
    this.is_drawn = false;
    this.markersLayer.clearLayers();
    this.resource_items = [];
  }

  onDrawEdited(e: any) {
    this.is_drawn = true;
    var layers = e.layers;
    layers.eachLayer((layer: { getLatLng: () => any; getRadius: () => number; }) => {
      if (layer instanceof L.Circle) {
        var geometry = 'Point';
        var types = 'intersects';
        var point = [];
        var center_point = layer.getLatLng();
        point.push(center_point['lng'], center_point['lat']);
        var radius = Math.ceil(layer.getRadius());
        this.markersLayer.clearLayers();
        this.api_call(point, radius, types, geometry);
      } else if (
        layer instanceof L.Polygon &&
        !(layer instanceof L.Rectangle)
      ) {
        var geometry = 'Polygon';
        var types = 'within';
        var radius = 0;
        var polyPoints = [];
        var _obj = Object.keys(layers._layers)[0];
        var points = layers._layers[_obj]['_latlngs'][0];
        points.forEach((p: { lng: any; lat: any; }) => {
          polyPoints.push([p.lng, p.lat]);
        });
        polyPoints.push([points[0].lng, points[0].lat]);
        this.markersLayer.clearLayers();
        this.api_call(polyPoints, radius, types, geometry);
      } else if (layer instanceof L.Rectangle) {
        var geometry = 'bbox';
        var types = 'within';
        var radius = 0;
        var _obj1 = Object.keys(layers._layers)[0];
        var bound_points = layers._layers[_obj1]['_latlngs'][0];
        var boundingPoints = [];
        boundingPoints.push([bound_points[1]['lng'], bound_points[1]['lat']]);
        boundingPoints.push([bound_points[3]['lng'], bound_points[3]['lat']]);
        this.markersLayer.clearLayers();
        this.api_call(boundingPoints, radius, types, geometry);
      }
    });
  }

  api_call(points: any, radius: number, types: string, geometry: string) {
    this.drawQuery = {
      type: types,
      geometry: geometry,
      radius: radius,
      coordinates: points,
    };
    this.getMapData();
  }

  callGeoJsonPlot(items : any) {
    for (const i of items) {
      if (i.hasOwnProperty('location')) {
        this.plotGeoJSONs(
          i['location']['geometry']['type'],
          i,
          i['resourceGroup']
        );
      } else if (i.hasOwnProperty('coverageRegion')) {
        this.plotGeoJSONs(
          i['coverageRegion']['geometry'],
          i,
          i['resourceGroup']
        );
      }
    }
  }

  plotGeoJSONs(geoJsonObject: any, data: any,rsg: any) {
    let mySet = new Set();
    for (var i = 0; i < this.resource_groups.length; i++) {
      if (this.resource_groups[i].accessPolicy == 'OPEN') {
        mySet.add(this.resource_groups[i].id);
      }
    }
    if (geoJsonObject == 'Point') {
      let isPublic: boolean;
      this.name = data.name;
      var lng = data.location.geometry.coordinates[0];
      var lat = data.location.geometry.coordinates[1];
      if (mySet.has(rsg)) {
        isPublic = true;
      } else {
        isPublic = false;
      }
      var customPopup =
        `<div id="name"> <p style='font-weight:bold'>` +
        this.name +
        `</p> </div>
        <div class = "text-centre"> <p>` +
        data.description +
        `</p><p>Group: ` +
        data.resourceGroup.split('/')[3] +
        `</p> </div>
        <div id="pop_up_` +
        data.id +
        `"> <p class="text-center" style='padding-right:2px'> </p>` +
        (isPublic
          ? `<a  class="data-link" data-Id=` +
            data +
            ` style="color: var(--highlight); font-weight:bold;"> Get Latest Data </a>`
          : `<a  class="sample-link" data-Id=` +
            data.id +
            ` style="color: var(--highlight); font-weight:bold;"> Get Sample Data </a>&nbsp;&nbsp; ` +
            `<a style="color: var(--error); font-weight:bold;"> Request Access </a><br>` +
            `</div>`);

      const markers = L.marker([lat, lng], {
        icon: this.getMarkerIcon(rsg),
        riseOnHover: true,
      }).bindPopup(customPopup);

      this.markersLayer.addLayer(markers);
      this.markersLayer.addTo(this.map);
      let self = this;
      markers.on('popupopen', function () {
        // add event listener to newly added a.merch-link element
        self.elementRef.nativeElement
          .querySelector('.data-link')
          .addEventListener('click', (e: any) => {
            // get id from attribute
            var dataId = e.target.getAttribute('data-Id');
            // self.display_latest_data(dataId);
          });
      });
      // markers.getPopup().on('remove', function () {
      //   this.map.closePopup();
      // });
    }
  }

  getMarkerIcon(_rsg: any) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: this.getColor(_rsg),
    });
  }

  getColor(id: any) {
    let index = -1;
    for (let i = 0; i < this.searchQuery.resource_groups.length; i++) {
      if (this.searchQuery.resource_groups[i] == id) {
        index = i;
        break;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${this.pathFillColor[index]} width="50px" height="50px" outline="5px solid white"><path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2-1.12-2-2s1.12-2 2-2 2 1.12 2 2-1.12 2-2 2z" opacity="1" stroke="white" stroke-width="0.5" /><circle cx="12" cy="9.5" r="2" fill="white"/></svg>
    `;
  }
  display_latest_data(id: any, rsg:any) {
     this.resource_groups.forEach((e:any) => {
      if(e.name == rsg) {
        this.accesspolicy = e.accessPolicy;}
    });
    // console.log(this.accesspolicy)
    this.global.set_item_id(id);
    this.global.set_data_type(this.accesspolicy);
    this.ngZone.run(() => {
        this.global.set_popup(true,'latest-data');
      });
    
  }
  display_sample_data(id: any) {
    // this.ngZone.run(() => {
    //   this.router.navigate(['/search/map/sample-data']);
    // });
  }
  stringToColour(str: any) {
    var color = [
      '#1c699d',
      '#ff7592',
      '#564d65',
      '#2fcb83',
      '#0ea3b1',
      '#f39c1c',
      '#d35414',
      '#9b59b6',
    ];
    let index = -1;
    for (let i = 0; i < this.searchQuery.resource_groups.length; i++) {
      if (this.searchQuery.resource_groups[i].split('/')[3] === str) {
        // console.log(this.searchQuery.resource_groups[i]);
        index = i;
        // console.log(index);
        break;
      }
  }
  return color[index];
  }
  showLegends(val:any){
    this.grades = [];
    this.markerValues = [];
    this.getProviderDetails();
    for(let i=0;i<this.searchQuery.resource_groups.length;i++){
      for(let j = 0 ; j < val.length ; j++){
      
        if(val[j].location.geometry){
          if(val[j].location.geometry.type == 'Polygon'){
            
            var res = this.searchStringInArray(val[j].resourceGroup,this.searchQuery.resource_groups[i]);
            if(res === true) {

              if(this.pr_detail.hasOwnProperty(val[j].resourceGroup)) {
                this.grades.push(this.pr_detail[val[j].resourceGroup]);
                }
              // this.grades.push(val[j].resourceGroup.split('/')[3]);
              this.markerValues.push(true);
              break;
            }
          } else if(val[j].location.geometry.type == 'Point' ){
            var res = this.searchStringInArray(val[j].resourceGroup,this.searchQuery.resource_groups[i] );
            if(res === true) {
              // console.log(val[j].resourceGroup)
              if(this.pr_detail.hasOwnProperty(val[j].resourceGroup)) {
                this.grades.push(this.pr_detail[val[j].resourceGroup]);
                }
            // this.grades.push(val[j].resourceGroup.split('/')[3]);
            this.markerValues.push(false);
            break;
            }
            }
        }
      }
    } 
  }
  getProviderDetails(){
      let resp = this.global.get_id_name_rel();
      this.pr_detail = resp ;
  }
   searchStringInArray (str: any, strArray: string) {
    // for (var j=0; j<strArray.length; j++) {
        if (strArray.match(str)) return true;
    // }
    return false;
  }
  back() {
    this.locate.back();
  }

  open_filter(): void {
    this.global.set_popup(true, 'geo-filter');
  }

}
