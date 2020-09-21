import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import {
  latLng,
  tileLayer,
  FeatureGroup,
  DrawEvents,
  Map,
  featureGroup,
} from 'leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet.markercluster';
import { InterceptorService } from '../interceptor.service';
import { ConstantsService } from '../constants.service';

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
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent {
  map: Map;
  show_filter: boolean;
  options: any;
  drawOptions: any;
  text: string;
  body: any;
  resource_groups: any;
  filtered_resource_groups: any;
  results: any;
  markerResults: any;
  searchQuery: any;
  resource: any;
  // resourceAuthControlLevel: string;
  layers;
  coord: any = [];
  showContainer: boolean = false;
  drawnItems: FeatureGroup = featureGroup();
  markersLayer = new L.FeatureGroup(null);
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  data: any;
  name: string;
  describe: string;
  publisher: string;
  legends: {};
  texts: { resource_groups: string; resource_items: string; providers: string };
  search_text: string;
  is_drawn: Boolean;
  search: any;
  city: any;
  drawQuery: any;
  resource_items: any;
  filtered_resource_items: any;
  count: any;
  limit: Number;
  highlightStyle: { color: string; opacity: number; weight: number; fillOpacity: number; };
  defaultStyle: { color: string; opacity: number; weight: number; fillOpacity: number; };
  constructor(
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService,
    private router: Router,
    private elementRef: ElementRef,
    public ngZone: NgZone
  ) {
    // this.resource = this.constant.set_resource_details(this.resource_groups);
    // this.resourceAuthControlLevel = this.resource.resource_group.resourceAuthControlLevel;
    this.is_drawn = false;
    this.search = {
      group: '',
    };
    this.limit = 5;
    this.count = 0;
    this.show_filter = false;
    this.body = {};
    this.resource_items = [];
    this.filtered_resource_items = [];
    this.searchQuery = window.sessionStorage.map_search
      ? JSON.parse(window.sessionStorage.map_search)
      : { resource_groups: [] };
    this.count = this.searchQuery.resource_groups.length;
    this.drawQuery = {};
    this.filtered_resource_groups = [];
    this.resource_groups = [];
    this.texts = this.constantService.get_nomenclatures();
    this.httpInterceptor.get_filter().subscribe((flag: any) => {
      this.show_filter = flag;
    });
    if (this.searchQuery.resource_groups.length == 0) {
      this.httpInterceptor.set_filter(true);
    }
    this.city = this.constantService.get_city();
    // console.log(this.city);

    // for map type=Polygon to highlight when there is overlapping of layers
 this.highlightStyle = {
  color: '#ff0000',
  opacity:1,
  weight: 3,
  fillOpacity: 1,
};

this.defaultStyle = {
  color: '#000000',
  opacity:0.5,
  weight: 1,
  fillOpacity: 0.7,
};
    
  }

  ngOnInit(): void {
    this.options = this.initMap();
    this.drawOptions = this.drawOptionsInit();
     
    //  this.markersLayer.addLayer(marker);
    //   this.markersLayer.addTo(this.map);
  }

  getMapData() {
    this.filtered_resource_items = [];
    if (this.is_drawn) {
      this.httpInterceptor
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
        this.httpInterceptor
          .post_api( 'customer/map', this.searchQuery)
          .then((data: any) => {
             console.log(data);  
            this.resource_items = data.items;
            this.resource_groups = data.resource_groups;
            this.get_filters(data);
            // this.get_legends(this.resource_groups);
            if (this.searchQuery.resource_groups.length != 0)
              this.filter_data();
          });
      }
    }
  }

  filter_data() {
    this.filtered_resource_items = [];
    console.log( this.resource_items);
      this.resource_items.forEach((a)=>{
      let flag = this.check_if_contained(
        this.searchQuery.resource_groups,
        a.resourceGroup
      );

      if (flag == true) 
      {
        this.filtered_resource_items.push(a);
      }
      });
      console.log(this.filtered_resource_items);
    this.mark_on_map();
  }

  filter_map_data() {
    this.filtered_resource_items = [];
    this.resource_items.forEach((a) => {
      // console.log(a);
      let flag = this.check_if_contained(
        this.searchQuery.resource_groups,
        a.resourceGroup
      );
      if (flag == true) this.filtered_resource_items.push(a);
    });
    this.callGeoJsonPlot(this.filtered_resource_items);
  }

  get_filters(response) {
    this.resource_groups = response.resource_groups;
    this.filtered_resource_groups = this.resource_groups;
    this.resource_groups.forEach((a) => {
      if (this.searchQuery.resource_groups.includes(a.id)) a.flag = true;
      else a.flag = false;
    });
  }

  check_if_contained(arr, str) {
    // console.log(arr);
    // console.log(str);
    return arr.includes(str);
  }

  mark_on_map() {
    let mySet = new Set();
    for (var i = 0; i < this.resource_groups.length; i++) {
      if (this.resource_groups[i].accessPolicy == 'OPEN') {
        mySet.add(this.resource_groups[i].id);
      }
    }
    const data: L.Marker[] = [];
    // console.log(this.filtered_resource_items);
    for (const c of this.filtered_resource_items) {
      let isPublic: Boolean;
      //  console.log(c)
      // Condition to check whether the geometry type is polygon or point
      if(c.location.geometry.type == 'Point'){
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
                c.id +
                ` style="color: var(--highlight); font-weight:bold;"> Get Latest Data </a>`
              : `<a  class="sample-link" data-Id=` +
                c.id +
                ` style="color: var(--highlight); font-weight:bold;"> Get Sample Data </a>&nbsp;&nbsp; ` +
                `<a style="color: var(--erthis.resource_groupsror); font-weight:bold;"> Request Access </a><br>` +
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
      }

      else if(c.location.geometry.type == 'Polygon'){

        var points = c.location.geometry.coordinates[0];
        // console.log(points);
        console.log(c.resourceGroup.split('/')[3]);
        if (mySet.has(c.resourceGroup)) {
          isPublic = true;
        } else {
          isPublic = false;
        }

        console.log(c.location.geometry);
        L.geoJSON((c.location.geometry), {
          style: {
              fillColor:this.stringToColour(c.resourceGroup.split('/')[3]),
              weight: 2,
              opacity: 1,
              // color: 'white',
              // dashArray: '3',
              fillOpacity: 0.5
          },
          onEachFeature: function (feature, layer) {

              // layer.bindTooltip(`<div><p style="font-size:20px;"><strong>`+_resourceId+`</strong></p></div>`)
              // layer.on('mouseover', function(e) {
              //     this.setStyle(this.highlightStyle);
              //     // this.bindTooltip(`<div><p style="font-size:20px;"><strong>`+_resourceId+`</strong></p></div>`)
              //     this.bringToFront();
              //     });

                  // layer.on('mouseout', function(e) {
                  // this.setStyle(this.defaultStyle);
                  // this.bringToBack();
                  // });
              
              // layer.on('click', function (e) {

              //     activate_point_mode(_id)

              // });
              // layer.bindPopup(`<div id="pop_up_`+ resource_id_to_html_id(_id) +`"><p class="text-center" style="padding-right:7.5px;"><img src='`+
              // ((is_public) ? "../assets/img/icons/green_unlock.svg" : "../assets/img/icons/red_lock.svg")
              // +`' class='img-fluid secure_icon'></p>`+get_bullets()+` <a href='#' class='data-modal'  onclick="display_latest_data(event, this, '` + _id + `')"> Get latest-data</a><br>
              //   `+get_bullets()+` <a href="#"  class="data-modal" onclick="display_temporal_data(event, this, '`+_json_object.id+`')">Get Temporal Data</a><br>` +
              // ((is_secure) ? ` `+get_bullets()+` <a href='#' class='data-modal'  onclick="request_access_token('` + _json_object.id + `', '`+ _json_object["resourceServerGroup"]["value"] + `', '`+ _json_object["resourceId"]["value"] + `')">Request Access Token</a>` : ``
              // + `</div>`)
              // ).addTo(map);
          }

      }).addTo(this.map);
      }
    }
  }
  onMapReady(map: Map) {
    this.map = map;
    // L.marker([ this.city.coordinates[0], this.city.coordinates[1]], { icon :iconDefault }).bindPopup('<h5>'+this.city.name+'Office'+'</h5>').addTo(this.map);
    this.getMapData();
    
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  initMap() {
    var map_options = {
      layers: [
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            attribution:
              '<span class="icons-font" id="map_attr">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a><br>' +
              '</span>' +
              '<div class="icons-font"> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> ',
          }
        )
        // ,L.marker([ this.city.coordinates[0], this.city.coordinates[1]], { icon :iconDefault })
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

  closeFilter() {
    this.httpInterceptor.set_filter(false);
  }
  toggle_dataset(id) {
    this.resource_groups.forEach((a, i) => {
      if (a.id == id) {
        let flag = !this.resource_groups[i].flag;
        if (flag && this.count == this.limit) {
          this.constantService.set_alert({
            flag: true,
            title: 'Limit Exceeeded.',
            message: 'You can filter by maximum 2 resource groups at a time.',
          });
        } else if (flag && this.count < this.limit) {
          this.resource_groups[i].flag = !this.resource_groups[i].flag;
          this.count++;
        } else {
          this.resource_groups[i].flag = !this.resource_groups[i].flag;
          this.count--;
        }
      }
    });
  }

  find_group_status(id) {
    let flag = false;
    this.resource_groups.forEach((a) => {
      if (a.id == id && a.flag == true) flag = true;
    });
    return flag;
  }

  filter_by_group() {
    let str = this.search.group.toLowerCase();
    this.filtered_resource_groups = this.resource_groups.filter((e) => {
      return e.name.toLowerCase().includes(str);
    });
  }

  clear() {
    this.count = 0;
    this.resource_groups.forEach((a) => {
      a.flag = false;
    });
    this.searchQuery = {
      resource_groups: [],
    };
    window.sessionStorage.map_search = JSON.stringify(this.searchQuery);
    this.closeFilter();
    this.markerClusterGroup.clearLayers();
    this.markersLayer.clearLayers();
    this.getMapData();
  }

  apply() {
    this.searchQuery.resource_groups = this.resource_groups
      .filter((a) => {
        return a.flag == true;
      })
      .map((a) => {
        return (a = a.id);
      });
    if (this.searchQuery.resource_groups.length == 0) return;
    window.sessionStorage.map_search = JSON.stringify(this.searchQuery);
     console.log(this.searchQuery);
    this.closeFilter();
    this.is_drawn = false;
    this.markersLayer.clearLayers();
    this.getMapData();
  }

  onDrawCreated(e: any) {
    this.is_drawn = true;
    const layer = (e as DrawEvents.Created).layer;
    this.markerClusterGroup.clearLayers();
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
      points.forEach((p) => {
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
    layers.eachLayer((layer) => {
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
        points.forEach((p) => {
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

  api_call(points, radius, types, geometry) {
    this.drawQuery = {
      type: types,
      geometry: geometry,
      radius: radius,
      coordinates: points,
    };
    this.getMapData();
  }

  callGeoJsonPlot(items) {
    console.log(items);
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

  plotGeoJSONs(geoJsonObject, data, rsg) {
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
            data.id +
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
          .addEventListener('click', (e) => {
            // get id from attribute
            var dataId = e.target.getAttribute('data-Id');
            self.display_latest_data(dataId);
          });
      });
      // markers.getPopup().on('remove', function () {
      //   console.log('close popup');
      //   this.map.closePopup();
      // });
    }
  }

  getMarkerIcon(_rsg) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: this.getColor(_rsg),
    });
  }

  getColor(id) {
    let index = -1;
    for (let i = 0; i < this.searchQuery.resource_groups.length; i++) {
      if (this.searchQuery.resource_groups[i] == id) {
        index = i;
        break;
      }
    }
    var pathFillColor = [
      '#1c699d',
      '#ff7592',
      '#564d65',
      '#2fcb83',
      '#0ea3b1',
      '#f39c1c',
      '#d35414',
      '#9b59b6',
    ];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${pathFillColor[index]} width="48px" height="48px" outline="5px solid white"><path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2-1.12-2-2s1.12-2 2-2 2 1.12 2 2-1.12 2-2 2z" opacity="1" stroke="white" stroke-width="0.5" /><circle cx="12" cy="9.5" r="2" fill="white"/></svg>
    `;
  }
  display_latest_data(id) {
    this.ngZone.run(() => {
      this.router.navigate(['/search/map/latest-data']);
    });
  }
  display_sample_data(id) {
    this.ngZone.run(() => {
      this.router.navigate(['/search/map/sample-data']);
    });
  }
  stringToColour(str) {
    
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
    
    return color[0];
  }
  
  get_legends(val:any){
  // Adding Legend to the map
  const legend = new (L.Control.extend({
  options: { position: 'bottomleft' }
  }));
  legend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'legend');
  const labels = [
                "assets/marker_blue.png",
                "assets/marker_pink2.png",
                // "https://img.icons8.com/ultraviolet/40/000000/marker.png",
                // "https://img.icons8.com/color/48/000000/marker.png", 
                "https://img.icons8.com/color/48/000000/air-quality.png", 
                "https://img.icons8.com/office/16/000000/sensor.png", 
                "https://img.icons8.com/flat_round/64/000000/wi-fi-connected.png", 
                
                 

    ];
    // const   grades = ["StreetLight", "AQM", "Flood-Sensor", "Wifi-Hotspot", "ITMS", "ChangeBhai", "SafetyPin", "TomTom"];
    const grades =[];
    // console.log(val);
    val.forEach(a => {
      // console.log(a);
      grades.push(a.id.split('/')[3])
    });
    div.innerHTML = '<div><h1 style="color:black;font-size:18px;font-weight:600;padding-left:15px">LEGENDS</h1></div><br>';
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += (" <div style='display: flex;align-items: center;'><img src=" + labels[i] + " height='50' width='50'>") + "<span style='font-weight:600;padding-left: 15px;font-size:16px'>"+ grades[i] +"</span></div>" +'<br>';
    }
    return div;
  };
  legend.addTo(this.map);
  }
}
