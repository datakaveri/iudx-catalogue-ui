import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { ActivatedRoute } from '@angular/router';
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
  Marker,
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
  tags: any;
  providers: [];
  pages: number;
  searchQuery: {};
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

  constructor(
    private constantService: ConstantsService,
    private httpInterceptor: InterceptorService
  ) {
    this.constantService.get_filter().subscribe((val) => {
      this.show_filter = val;
    });
    this.body = {
      text: '',
      tags: [],
      providers: [],
      page: 0,
      resource_groups: [],
    };
    this.legends = {
      'aqm-bosch-climo':
        ' https://image.flaticon.com/icons/svg/1808/1808701.svg',
    };
  }
  ngOnInit(): void {
    this.options = this.initMap();
    this.getMapData();
    this.drawOptions = this.drawOptionsInit();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.getMapData;
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    // console.log(group);
    this.markerClusterGroup = group;
  }

  getMapData() {
    this.tags = this.body.tags;
    this.providers = this.body.providers;
    this.resource_groups = this.body.resource_groups;
    this.pages = this.body.page;
    this.body = this.getBody(
      this.text,
      this.tags,
      this.resource_groups,
      this.providers,
      this.pages
    );
    this.httpInterceptor
      .post_api('customer/map', this.body)
      .then((response: any) => {
        const data: L.Marker[] = [];

        this.results = response;
        console.log(this.results);

        /** Added this to get all items on opening GeoInformation**/

        for (const c of response.items) {
          this.describe = c.description;
          this.name = c.name;
          var lng = c.location.geometry.coordinates[0];
          var lat = c.location.geometry.coordinates[1];
          // const markers = L.marker([lat, lng]).bindPopup(this.describe);
          const markers = L.marker([lat, lng]).bindPopup(
            `<div id="name">` +
              // this.describe.split('Description for')[1] +
              this.name +
              `</div>
              <div id="pop_up_` +
              c.id +
              `"><p class="text-center" style="padding-right:7.5px;">
          </p>` +
              this.get_bullets() +
              ` <a   class='data-modal'  (click)="display_latest_data($event, ` +
              response.items +
              `, ` +
              c.id +
              `)"> Get latest-data</a><br>` +
              `</div>`
          );
          //     .addTo(this.map);
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

  closeFilter() {
    this.show_filter = false;
  }

  getBody(_text, _tags, _resource_groups, _providers, _page) {
    this.body = {
      text: _text,
      tags: _tags,
      resource_groups: _resource_groups,
      providers: _providers,
      page: _page,
    };
    return this.body;
  }

  initMap() {
    var map_options = {
      layers: [
        tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            attribution:
              '<span id="map_attr">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a><br>' +
              '</span>',
          }
        ),
      ],
      zoom: 13,
      center: latLng({ lng: 73.836808, lat: 18.5727 }),
    };
    // L.marker([this.lat, this.lng]);

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
    // console.log('Draw Created Event!');
    const layer = (e as DrawEvents.Created).layer;
    // console.log(e);
    this.markerClusterGroup.clearLayers();
    this.markersLayer.clearLayers();
    var type = e.layerType;
    // console.log(type);
    // const layer = (e as DrawEvents.Created).layer;
    if (type === 'circle') {
      var center_point = e.layer._latlng;
      var radius = Math.ceil(e.layer._mRadius);
      // console.log(center_point);
      // console.log(radius);
      //Api call for getting items for that area
      this.httpInterceptor
        .get_api_test_map(
          `https://139.59.31.45:8443/iudx/cat/v1/search?geoproperty=location&georel=intersects&maxDistance=${radius}&geometry=Point&coordinates=[ ${center_point['lng']},${center_point['lat']}]`
        )
        .then((res) => {
          // console.log(res);
          this.data = res;
          for (var i = this.data.results.length - 1; i >= 0; i--) {
            if (this.data.results[i].hasOwnProperty('location')) {
              // myLayer.addData(data[i]['geoJsonLocation']);
              this.plotGeoJSONs(
                this.data.results[i]['location']['geometry']['type'],
                this.data.results[i]['id'],
                this.data.results[i],
                this.data.results[i]['resourceGroup'],
                this.data.results[i]['provider']
              );
            } else if (this.data.results[i].hasOwnProperty('coverageRegion')) {
              // myLayer.addData(data[i]['geoJsonLocation']);
              ////console.log("1")
              this.plotGeoJSONs(
                res[i]['coverageRegion']['geometry'],
                this.data.results[i]['id'],
                this.data.results[i],
                this.data.results[i]['resourceGroup'],
                this.data.results[i]['provider']
              );
              ////console.log("2")
            }
          }
        });
    } else if (type === 'polygon') {
      var points = e.layer._latlngs[0];
      var polyPoints = [];
      var coordinates;
      for (let i = 0; i <= points.length - 1; i += 1) {
        // console.log('print');
        coordinates = [points[i]['lng'] + ',' + points[i]['lat']];
        // console.log(coordinates);
        polyPoints.push('[' + coordinates + ']');

        polyPoints.join(',]');
      }
      // console.log(polyPoints);

      this.httpInterceptor
        .get_api_test_map(
          `https://139.59.31.45:8443/iudx/cat/v1/search?geoproperty=location&georel=within&geometry=Polygon&coordinates=[[${polyPoints},${polyPoints[0]}]]`
        )
        .then((res) => {
          // console.log(res);
          this.data = res;
          for (var i = this.data.results.length - 1; i >= 0; i--) {
            if (this.data.results[i].hasOwnProperty('location')) {
              this.plotGeoJSONs(
                this.data.results[i]['location']['geometry']['type'],
                this.data.results[i]['id'],
                this.data.results[i],
                this.data.results[i]['resourceGroup'],
                this.data.results[i]['provider']
              );
            } else if (this.data.results[i].hasOwnProperty('coverageRegion')) {
              this.plotGeoJSONs(
                res[i]['coverageRegion']['geometry'],
                this.data.results[i]['id'],
                this.data.results[i],
                this.data.results[i]['resourceGroup'],
                this.data.results[i]['provider']
              );
            }
          }
        });
    }
    //else if (type === 'rectangle') {
    //   console.log(layer);
    //   var bound_points = e.layer._bounds;
    //   var boundingPoints = [];

    //   var b1 =
    //     bound_points._northEast['lat'] + ',' + bound_points._northEast['lng'];
    //   var b2 =
    //     bound_points._southWest['lat'] + ',' + bound_points._southWest['lng'];
    //   boundingPoints.push(b1);
    //   boundingPoints.push(b2);
    //   boundingPoints.join(',');
    //   console.log(boundingPoints);
    //   //Api call for getting items for that area
    // }

    this.drawnItems.addLayer(layer);
    this.markersLayer.addLayer(layer);
    // this.markerClusterData.addLayer(layer);
  }
  onDrawDeleted(e: any) {
    // console.log('deleted');
    this.markersLayer.clearLayers();
  }

  onDrawStart(e: any) {
    console.log('Draw Started Event!');
    // this.markerClusterGroup.clearLayers();
    // this.map.removeLayer(this.markerClusterGroup);
  }
  plotGeoJSONs(geoJsonObject, id, data, rsg, provider) {
    console.log(geoJsonObject);
    console.log(id);
    console.log(data);
    if (geoJsonObject == 'Point') {
      // console.log('Printing Point....');
      this.name = data.name;
      var lng = data.location.geometry.coordinates[0];
      var lat = data.location.geometry.coordinates[1];
      // console.log(lng, lat);
      // const markers = L.marker([lat, lng]).bindPopup(this.describe);
      var customPopup =
        `<div id="name">` +
        // this.describe.split('Description for')[1] +
        data.name +
        `</div>
                <div id="pop_up_` +
        data.id +
        `"><p class="text-center" style="padding-right:7.5px;">
            </p>` +
        this.get_bullets() +
        ` <a class='data-modal' (click)="display_latest_data($event, ` +
        data +
        `, ` +
        data.id +
        `)"> Get latest-data</a><br>` +
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
    return L.icon({
      iconUrl: this.legends[_rsg.split('/')[3]],
      iconSize: [38, 95], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
      shadowSize: [41, 41], // size of the shadow
    });
  }

  get_selected_values() {
    //Call for filters
    var value = this.get_selected_values_checkbox();
    var tags = value.tags;
    var rsg = value.rsg;
    var provider = value.provider;
    //console.log(tags, rsg , provider)

    var __filter_url = '';

    if (tags.length == 0 && rsg.length == 0 && provider.length == 0) {
      __filter_url = `property=[]&value=[[]]`;
    } else {
      // //console.log("else...")
      var property = this.get_api_encoded_attribute_names(tags, rsg, provider);
      // //console.log(_attr_names)
      var values = this.get_api_encoded_attribute_values(tags, rsg, provider);
      // //console.log(_attr_values)
      __filter_url = `property=` + property + `&value=` + values;
    }
    return __filter_url;
  }
  get_api_encoded_attribute_names(__tags, __rsg, __pvdr) {
    var str = [];
    if (__tags.length != 0) {
      str.push('tags,type');
    }
    if (__rsg.length != 0) {
      str.push('resourceGroup,type');
    }
    if (__pvdr.length != 0) {
      str.push('provider,type');
    }
    //console.log(str.join(","))
    return '(' + str.join(',') + ')';
  }
  get_api_encoded_attribute_values(_tags, _rsg, _pr) {
    var str = [];

    if (_tags.length != 0) {
      str.push('[' + _tags.join(',') + ']');
    }
    if (_rsg.length != 0) {
      str.push('[' + _rsg.join(',') + ']');
    }
    if (_pr.length != 0) {
      str.push('[' + _pr.join(',') + ']');
    }
    return '[' + str.join(',') + ',[iudx:Resource]';
  }

  get_selected_values_checkbox() {
    //call when checkbox is clicked
    var _tags = [];
    var _rsg = [];
    var _pr = [];
    var tag_elements = <HTMLInputElement[]>(
      (<any>document.getElementsByName('taglist'))
    );
    var rsg_elements = <HTMLInputElement[]>(
      (<any>document.getElementsByName('rsglist'))
    );
    var pr_elements = <HTMLInputElement[]>(
      (<any>document.getElementsByName('prlist'))
    );

    for (let i of tag_elements) {
      if (i.type == 'checkbox') {
        if (i.checked == true) {
          _tags.push(i.value);
        }
      }
    }

    for (let i of pr_elements) {
      if (i.type == 'checkbox') {
        if (i.checked) {
          _pr.push(i.value);
        }
      }
    }

    for (let i of rsg_elements) {
      if (i.type == 'checkbox') {
        if (i.checked) {
          _rsg.push(i.value);
        }
      }
    }

    //alert("My taglists are: " + _tags.join(", ")+"and My resource group are:" +_rsg.join(", "));

    return {
      tags: _tags,
      rsg: _rsg,
      provider: _pr,
    };
  }
}
