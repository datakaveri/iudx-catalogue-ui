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

  showContainer: boolean = false;
  drawnItems: FeatureGroup = featureGroup();
  markersLayer = new L.FeatureGroup(null);
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  onDrawCreated(e: any) {
    console.log('Draw Created Event!');
    console.log(e);
    this.markersLayer.clearLayers();
    var type = e.layerType;
    console.log(type);
    const layer = (e as DrawEvents.Created).layer;
    if (type === 'circle') {
      var center_point = e.layer._latlng;
      var radius = e.layer._mRadius;
      console.log(center_point);
      console.log(radius);
      //Api call for getting items for that area
    } else if (type === 'polygon') {
      var points = e.layer._latlng;
      var polypoints = [];
      console.log(points);

      for (var i = 0; i < points[0].length - 1; i += 2) {
        var coordinates = +points[0][i]['lat'] + ',' + points[0][i]['lng'];
        polypoints.push(coordinates);
        polypoints.join(',');
      }
      console.log(polypoints);
    }

    this.drawnItems.addLayer(layer);
    this.markersLayer.addLayer(layer);
    // this.markerClusterData.addLayer(layer);
  }
  onDrawDeleted(e: any) {
    console.log('deleted');
    this.markersLayer.clearLayers();
  }

  onDrawStart(e: any) {
    console.log('Draw Started Event!');
  }
  describe: string;
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

        for (const c of response.items) {
          this.describe = c.description;
          var lng = c.location.geometry.coordinates[0];
          var lat = c.location.geometry.coordinates[1];
          // const markers = L.marker([lat, lng]).bindPopup(this.describe);
          const markers = L.marker([lat, lng]).bindPopup(
            `<div id="desc">` +
              this.describe.split('Description for')[1] +
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
          for (let i = 0; i < response.items.length; i++) {
            data.push(markers);
          }

          this.markerClusterData = data;
        }
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
}
