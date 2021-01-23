/*
 * Copyright (C) 2020 machinestalk. <https://www.machinestalk.com>
 */
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NbDialogService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {ESidebarMenuService} from 'app/layouts/e-sidebar/e-sidebar-menu.service';
import {CardService} from 'app/shared/services/card.service';
import {CommonService} from 'app/shared/services/common.service';
import {JhiLanguageService} from 'ng-jhipster';
import {SessionStorageService} from 'ngx-webstorage';
import {MapLoaderService as Loader} from '../inspector-zones/map-zone/map.loader';
import {OverlappingMarkerSpiderfier} from 'ts-overlapping-marker-spiderfier';

declare const google: any;
const mapOptions = {
  center: {},
  zoom: 10,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};
@Component({
  selector: 'jhi-inspectors-live-tracking-map',
  templateUrl: './inspectors-live-tracking-map.component.html',
  styleUrls: ['./inspectors-live-tracking-map.component.scss'],
})
export class InspectorsLiveTrackingMapComponent implements OnInit {
  @Input() markerOnMap: any;
  @Input() Zoomlevel: any;
  infoAddress: any = [];
  languageSelected: any = null;
  map: any;
  oms: any;

  constructor(
    private cardService: CardService,
    private dialog: MatDialog,
    private eSidebarMenuService: ESidebarMenuService,
    private sessionStorage: SessionStorageService,
    private jhiLanguageService: JhiLanguageService,
    private dialogService: NbDialogService,
    private commonService: CommonService,
    private translateService: TranslateService,
  ) {}
  lat: number = 18.216797;
  lng: number = 42.503765;

  ngOnInit(): void {}

  ngOnChanges() {
    console.log('SourceFilters inspector', this.markerOnMap.length);

    this.eSidebarMenuService._languageSelected.subscribe((res: any) => {
      this.languageSelected = res
        ? res
        : this.sessionStorage.retrieve('locale') ||
          this.jhiLanguageService.getCurrentLanguage();
      mapOptions.center = {
        lat: this.lat,
        lng: this.lng,
      };
      Loader.load().then(() => {
        this.map = new google.maps.Map(
          document.getElementById('map'),
          mapOptions,
        );
        this.oms = new OverlappingMarkerSpiderfier(this.map);
        // console.log('this is map', this.map);
        // console.log('this is markerOnMap', this.markerOnMap);
        this.addMarkers();
      });
    });
  }

  addMarkers() {
    let bounds = new google.maps.LatLngBounds();
    if (this.markerOnMap.length == 1) {
      let lat = this.markerOnMap[0]?.LastPosition.Latitude;
      let lng = this.markerOnMap[0]?.LastPosition.Longitude;
      console.log('lat lng', lat, lng, this.markerOnMap);
      let position = new google.maps.LatLng(lat, lng);
      let MarkerWithLabel = require('markerwithlabel')(google.maps);
      let marker = new MarkerWithLabel({
        map: this.map,
        draggable: false,
        position: position,
        icon: this.selectMarkerType(this.markerOnMap[0].status),
        labelContent:
          this.markerOnMap[0]?.status == 'OnDuty' ||
          this.markerOnMap[0]?.status == 'OFFDuty'
            ? this.markerOnMap[0]?.InspectorName
            : '',
        labelAnchor: new google.maps.Point(38, 0),
        labelClass: 'my-custom-class-for-label',
        labelInBackground: true,
      });
      marker.setMap(this.map);
      this.addInfoWindow(lat, lng, marker, this.markerOnMap[0]);
      this.oms.addMarker(marker);
      // this.markers.push(marker);
      this.map.setCenter(position);
      this.map.setZoom(19);
    } else {
      this.markerOnMap.forEach((item: any) => {
        let lat = item.LastPosition.Latitude;
        let lng = item.LastPosition.Longitude;
        if (lat != null && lng != null) {
          let MarkerWithLabel = require('markerwithlabel')(google.maps);
          let position = new google.maps.LatLng(lat, lng);
          let marker = new MarkerWithLabel({
            map: this.map,
            draggable: false,
            position: position,
            icon: this.selectMarkerType(item.status),
            labelContent:
              item?.status == 'OnDuty' || item?.status == 'OFFDuty'
                ? item?.InspectorName
                : '',
            labelAnchor: new google.maps.Point(38, 0),
            labelClass: 'my-custom-class-for-label',
            labelInBackground: true,
          });
          this.addInfoWindow(item.Latitude, item.Longitude, marker, item);
          this.oms.addMarker(marker);
          bounds.extend(new google.maps.LatLng(lat, lng));
        }
      });
      this.map.fitBounds(bounds);
    }
  }

  selectMarkerType(icon: any): any {
    if (icon == 'OnDuty') {
      return '../../../../../content/images/livetracking/inspector_onduty.png';
    } else if (icon == 'OFFDuty') {
      return '../../../../../content/images/livetracking/inspector_off_duty.png';
    } else {
      return '../../../';
    }
  }

  addInfoWindow(Lat: any, lng: any, marker: any, item: any) {
    console.log('alkdshdsahdhsa', item);

    marker.infowindow = new google.maps.InfoWindow({
      width: 380,
      maxWidth: 400,
    });
    let infowindoContent = `<h3>${item?.InspectorName}</h3>
     <span class="rowdata">
     <div class="dot mr-2 mt-1" style="background-color:${
       item?.status == 'OnDuty'
         ? '#6763e7'
         : item?.status == 'OFFDuty'
         ? '#9689d9'
         : ''
     };"></div>
      <p style="margin-right:10px">
        ${
          item?.status == 'OnDuty'
            ? this.translateService.instant('monitoring.onduty')
            : item?.status == 'OFFDuty'
            ? this.translateService.instant('monitoring.offduty')
            : ''
        }
      </p>
     </span>
    <p class="task">${this.translateService.instant(
      'monitoring.NumberOfAssignedTasks',
    )}  &nbsp;&nbsp; ${item?.NbrTasks} <br/></p>
    <p class="task">${this.translateService.instant(
      'monitoring.NumberOfAssignedZone',
    )} &nbsp;&nbsp; ${item?.NbrZones} <br/></p>
    `;
    marker.infowindow = new google.maps.InfoWindow({
      width: 380,
      maxWidth: 400,
    });
    // google.maps.event.addListener(marker.infowindow, 'domready', () => {
    //   document.getElementById(`${item.ScheduledTaskId}`)?.addEventListener('click', () => {
    //     // this.showpopup(item);
    //   });
    // });
    marker.infowindow.setContent(infowindoContent);
    this.oms.addListener('click', (marker: any, event: any) => {
      marker.infowindow.open(this.map, marker);
    });
    this.oms.addListener('spiderfy', () => {
      marker.infowindow.close();
    });
    google.maps.event.addListener(this.map, 'click', (event: any) => {
      marker.infowindow.close();
    });
  }
  // mapClick(e: any) {
  //   for (var i = 0; i < this.infoAddress.length; i++) {
  //     this.infoAddress[i].close();
  //   }
  // }
  // markerClick(iw: any) {
  //   for (var i = 0; i < this.infoAddress.length; i++) {
  //     this.infoAddress[i].close();
  //   }
  //   this.infoAddress.push(iw);
  // }
}
