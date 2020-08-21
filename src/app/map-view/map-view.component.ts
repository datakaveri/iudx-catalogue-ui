import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Component, OnInit } from '@angular/core';
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
  results: any;
  markerResults: any;
  searchQuery: any;
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
  legends: {};
  texts: { resource_groups: string; resource_items: string; providers: string };
  search_text: string;
  show_data:boolean;

  constructor(
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.show_data = false;
    this.show_filter = false;
    this.body = {};
    this.searchQuery = {
      resource_groups:[]
    };
    // this.constantService.set_search_query(this.query)
    
    this.getMapData();
    this.texts = this.constantService.get_nomenclatures();
    // this.constantService.get_filter().subscribe((query) => {
    //   console.log(query)
    //   this.searchQuery = query;
    //   this.getMapData();
    // });
    this.httpInterceptor.get_filter().subscribe((flag: any)=>{
      console.log(flag)
      this.show_filter = flag;
    });
    this.legends = {
      'aqm-bosch-climo':
        'https://image.flaticon.com/icons/svg/1808/1808701.svg',
      'pune-bins': 'https://image.flaticon.com/icons/svg/3299/3299935.svg',
      'pune-streetlights':
        'https://image.flaticon.com/icons/svg/1245/1245929.svg',
    };
  }
  ngOnInit(): void {
    this.options = this.initMap();
    this.drawOptions = this.drawOptionsInit();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.getMapData;
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  getMapData() {
    if(window.sessionStorage.resource_groups != undefined){
      this.searchQuery.resource_groups = window.sessionStorage.resource_groups;
      // console.log(this.searchQuery.resource_groups)
    }
    
    this.httpInterceptor
      .post_api('customer/map', this.searchQuery)
      .then((response: any) => {
        const data: L.Marker[] = [];
        // console.log(response)
        this.results = response;
        console.log(this.results);
        this.get_filters(response.resource_groups);

        /** Added this to get all items on opening GeoInformation**/

        for (const c of response.items) {
          this.describe = c.description;
          this.name = c.name;
          var lng = c.location.geometry.coordinates[0];
          var lat = c.location.geometry.coordinates[1];
          const markers = L.marker([lat, lng]).bindPopup(
            `<div id="name">
            <p>` +
              this.describe.split('Description for')[1] +
              `</p>
            <h1>` +
              this.name +
              `</h1>
              </div>
              <div id="pop_up_` +
              c.id +
              `"><p class="text-center" style="padding-right:7.5px;">
          </p>` +
              this.get_bullets() +
              ` <a   class='data-modal'  (click)="display_latest_data($event, ` +
              response.items +
              `, ` +
              c.id +
              `)"> View Details </a><br>` +
              `</div>`
          );

          data.push(markers);

          this.markerClusterData = data;
        }

        // -----------------------------End of For----------------------//
      })
      .catch((e) => {
        console.log(e);
      });
  }
  onClick(event) {
    console.log(event.latlng);
  }
  get_bullets() {
    return `&#9679;`;
  }
  get_filters(response) {
    this.resource_groups = response;
    console.log(this.resource_groups);
    this.resource_groups.forEach((a) => {
      if (this.searchQuery.resource_groups.includes(a.name)) a.flag = true;
      else a.flag = false;
    });
  }
  closeFilter() {
    this.httpInterceptor.set_filter(false);
  }
  toggle_dataset(num) {
    this.resource_groups[num].flag = !this.resource_groups[num].flag;
    console.log(this.resource_groups[num].flag)
  }
  clear() {
    
    this.resource_groups.forEach(a=>{
      a.flag = false;
    });
    this.searchQuery = {
      
      resource_groups: [],
      
    };
    window.sessionStorage.resource_groups = JSON.stringify(this.searchQuery.resource_groups);
    this.closeFilter();
    this.markerClusterGroup.clearLayers();
    this.getMapData();
  }
  apply() {
    let resource_groups = this.resource_groups
      .filter((a) => {
        return a.flag == true;
      })
      .map((a) => {
        return (a = a.id);
      });
      console.log(resource_groups);
    this.searchQuery.resource_groups = resource_groups;
   window.sessionStorage.resource_groups = JSON.stringify(this.searchQuery.resource_groups);
   if(this.searchQuery.resource_groups.length == 0){
     this.markerClusterGroup.clearLayers();
   }
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
      zoom: 11,
      center: latLng({ lng: 73.836808, lat: 18.5727 }),
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
  display_latest_data(event, data, id) {
    console.log(event);
    console.log(data);
    console.log(id);
  }

  //Events created for Drawing, Editing & deleted

  onDrawCreated(e: any) {
    const layer = (e as DrawEvents.Created).layer;

    this.markerClusterGroup.clearLayers();
    // this.markersLayer.clearLayers();
    this.drawnItems.clearLayers();
    var type = e.layerType;

    if (type === 'circle') {
      console.log('circle created');
      var center_point = e.layer._latlng;
      var radius = Math.ceil(e.layer._mRadius);
      console.log(center_point);
      this.markersLayer.clearLayers();
      //Api call for getting items for that area
      this.api_call_circle(center_point, radius);
    } else if (type === 'polygon') {
      console.log('polygon created');
      var points = e.layer._latlngs[0];
      var polyPoints = [];
      var coordinates;
      for (let i = 0; i <= points.length - 1; i += 1) {
        coordinates = [points[i]['lng'] + ',' + points[i]['lat']];
        polyPoints.push('[' + coordinates + ']');

        polyPoints.join(',]');
      }
      // console.log(polyPoints);
      this.markersLayer.clearLayers();
      this.api_call_polygon(polyPoints);
    } else if (type === 'rectangle') {
      var bound_points = e.layer._latlngs[0];
      // console.log(bound_points);

      var boundingPoints = [];

      var b1 = bound_points[1]['lng'] + ',' + bound_points[1]['lat'];
      var b2 = bound_points[3]['lng'] + ',' + bound_points[3]['lat'];
      boundingPoints.push('[' + b1 + ']');
      boundingPoints.push('[' + b2 + ']');
      boundingPoints.join(',');

      // console.log(boundingPoints);

      //Api call for getting items for that area
      this.markersLayer.clearLayers();
      this.api_call_rectangle(bound_points);
    }

    this.drawnItems.addLayer(layer);
    // this.markersLayer.addLayer(layer);
    // this.markerClusterData.addLayer(layer);
  }
  onDrawDeleted(e: any) {
    // console.log('deleted');
    this.markersLayer.clearLayers();
  }
  onDrawEdited(e: any) {
    var layers = e.layers;
    // console.log(layers);
    layers.eachLayer((layer) => {
      if (layer instanceof L.Circle) {
        // console.log('editing circle');
        var center_point = layer.getLatLng();
        var radius = Math.ceil(layer.getRadius());
        this.markersLayer.clearLayers();
        this.api_call_circle(center_point, radius);
      } else if (
        layer instanceof L.Polygon &&
        !(layer instanceof L.Rectangle)
      ) {
        var polyPoints = [];
        var _obj = Object.keys(layers._layers)[0];
        var points = layers._layers[_obj]['_latlngs'][0];
        for (var i = 0; i < points.length - 1; i += 1) {
          var coordinates = [points[i]['lng'] + ',' + points[i]['lat']];
          polyPoints.push('[' + coordinates + ']');

          polyPoints.join(',');
        }
        console.log(polyPoints);
        this.markersLayer.clearLayers();
        this.api_call_polygon(polyPoints);
      } else if (layer instanceof L.Rectangle) {
        var _obj1 = Object.keys(layers._layers)[0];

        // var bound_points = layers._layers[_obj1]['_latlngs'];
        var bound_points = layers._layers[_obj1]['_latlngs'][0];
        var boundingPoints = [];
        console.log(layers);

        console.log(bound_points);

        var b1 = bound_points[1]['lng'] + ',' + bound_points[1]['lat'];
        var b2 = bound_points[3]['lng'] + ',' + bound_points[3]['lat'];
        boundingPoints.push('[' + b1 + ']', '[' + b2 + ']');
        boundingPoints.join(',');
        console.log(boundingPoints);
        this.markersLayer.clearLayers();
        this.api_call_rectangle(boundingPoints);
      }
    });
  }
  api_call_circle(center_point, radius) {
    console.log(center_point['lng'])
    this.body =
      {
        'type':'intersects',
        'geometry':'Point',
        'radius':radius,
        "coordinates": [center_point['lng'] ,center_point['lat']],
       'resource_groups': []
      };
    
    this.httpInterceptor
      .post_api('customer/coordinates?city=ui-test',this.body)
      .then((res) => {
         console.log(res);
         this.data = res;
        console.log(this.data.items.length);
        this.callGeoJsonPlot(this.data);
      });
  }
  api_call_polygon(polyPoints) {
    console.log(polyPoints);
    this.body =
      {
        'type':'within',
        'geometry':'Polygon',
        'radius':0,
        "coordinates":[polyPoints+","+polyPoints[0]],
       'resource_groups': []
      };
    this.httpInterceptor
      // .get_api_test_map(
      //   `https://139.59.31.45:8443/iudx/cat/v1/search?geoproperty=location&georel=within&geometry=Polygon&coordinates=[[${polyPoints},${polyPoints[0]}]]`
      // )
      .post_api('customer/coordinates',this.body)
      .then((res) => {
        // console.log(res);
        this.data = res;
        // console.log(this.data.results.length);
        this.callGeoJsonPlot(this.data);
      });
  }
  api_call_rectangle(boundingPoints) {
    console.log(JSON.stringify(boundingPoints));
    // var arr = boundingPoints.split('"');
    // console.log(arr)
    this.body =
    {
      'type':'within',
      'geometry':'bbox',
      'radius':0,
      "coordinates":[[boundingPoints[1]['lng'] ,boundingPoints[1]['lat']],[boundingPoints[3]['lng'] ,boundingPoints[3]['lat']]],
     'resource_groups': []
    };
    this.httpInterceptor
      // .get_api_test_map(
      //   `https://139.59.31.45:8443/iudx/cat/v1/search?geoproperty=location&georel=within&geometry=bbox&coordinates=[${boundingPoints}]`
      // )
      .post_api('customer/coordinates',this.body)
      .then((res) => {
        // console.log(res);
        this.data = res;
        this.callGeoJsonPlot(this.data);
      });
  }
  callGeoJsonPlot(data) {
    for (const i of data.items) {
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
    if (geoJsonObject == 'Point') {
      // this.describe = rsg;
      this.name = data.name;
      var lng = data.location.geometry.coordinates[0];
      var lat = data.location.geometry.coordinates[1];

      var customPopup =
        `<div id="name">
        <p>` +
        rsg.split('/')[3] +
        `</p>
        <h1>` +
        this.name +
        `</h1>
          </div>
                <div id="pop_up_` +
        data.id +
        `"><p class="text-center" style="padding-right:7.5px;">
            </p>` +
        this.get_bullets() +
        ` <a class='data-modal' (click)="display_latest_data($event, ` +
        data +
        `, ` +
        data.id +
        `)"> View Details</a><br>` +
        `</div>`;
      const markers = L.marker([lat, lng], {
        icon: this.getMarkerIcon(rsg),
        riseOnHover: true,
      }).bindPopup(customPopup);
      this.markersLayer.addLayer(markers);
      this.markersLayer.addTo(this.map);
    }
  }
  getMarkerIcon(_rsg) {
    console.log(_rsg);
    return L.icon({
      iconUrl: this.legends[_rsg.split('/')[3]],
      iconSize: [38, 95], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
      shadowSize: [41, 41], // size of the shadow
    });
  }
}
