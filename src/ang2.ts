/*
 * Copyright (C) 2020 machinestalk. <https://www.machinestalk.com>
 */
import {NgTemplateOutlet} from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {inputs} from '@syncfusion/ej2-angular-inputs/src/textbox/textbox.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {InspectorDialogComponent} from '../inspector-dialog/inspector-dialog.component';
import {CardService} from 'app/shared/services/card.service';

import {ESidebarMenuService} from 'app/layouts/e-sidebar/e-sidebar-menu.service';
import {LookUpService} from 'app/shared/services/look-up.service';
import {JhiLanguageService} from 'ng-jhipster';
import {SessionStorageService} from 'ngx-webstorage';
import {AssignmentEditModalComponent} from '../../assignment-edit-modal/assignment-edit-modal.component';
import {NbDialogService} from '@nebular/theme';
import {CommonService} from 'app/shared/services/common.service';
import {MapLoaderService as Loader} from '../../inspector-zones/map-zone/map.loader';
import {OverlappingMarkerSpiderfier} from 'ts-overlapping-marker-spiderfier';
import {TranslateService} from '@ngx-translate/core';

declare const google: any;
const mapOptions = {
  center: {},
  zoom: 10,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

@Component({
  selector: 'jhi-monitoring-map',
  templateUrl: './monitoring-map.component.html',
  styleUrls: ['./monitoring-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonitoringMapComponent implements OnInit {
  lat: any = 18.216797;
  lng: any = 42.503765;
  languageSelected: any = null;
  infoAddress: any = [];

  @Input() markerOnMap: any;
  @Input() SelectedTaskItems: any;
  @Input() statuslookups: any;
  Zoomlevel: any = 8;
  @Input() SourceFilters: any;

  latitude: number = 18.216797;
  longitude: number = 42.503765;

  filter: any;
  filtering: any = {};
  loadingFilter: boolean = true;
  filters: any = [];
  subscriptionitemAdded: any;
  tempArray = [];
  map: any;
  oms: any;

  constructor(
    private dialog: MatDialog,
    private eSidebarMenuService: ESidebarMenuService,
    private sessionStorage: SessionStorageService,
    private jhiLanguageService: JhiLanguageService,
    private dialogService: NbDialogService,
    private commonService: CommonService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.subscriptionitemAdded = this.commonService.itemEdited.subscribe(
      (data: any) => {
        if (data) {
          this.infoAddress = [];
        }
      },
    );
    this.eSidebarMenuService._languageSelected.subscribe((res: any) => {
      this.languageSelected = res
        ? res
        : this.sessionStorage.retrieve('locale') ||
          this.jhiLanguageService.getCurrentLanguage();
    });
  }

  ngOnChanges() {
    // console.log('SourceFilters', this.statuslookups);

    this.eSidebarMenuService._languageSelected.subscribe((res: any) => {
      this.languageSelected = res
        ? res
        : this.sessionStorage.retrieve('locale') ||
          this.jhiLanguageService.getCurrentLanguage();
      mapOptions.center = {
        lat: this.latitude,
        lng: this.longitude,
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
    if (
      this.markerOnMap.length == 1 &&
      this.markerOnMap[0]?.Position[0]?.length == 1
    ) {
      let lat = this.markerOnMap[0]?.Position[0].Latitude;
      let lng = this.markerOnMap[0]?.Position[0].Longitude;
      console.log('lat lng', lat, lng, this.markerOnMap);
      let position = new google.maps.LatLng(lat, lng);
      let MarkerWithLabel = require('markerwithlabel')(google.maps);
      let marker = new MarkerWithLabel({
        map: this.map,
        draggable: false,
        position: position,
        icon: this.selectMarkerType(
          this.markerOnMap[0]._StatusTask_description,
        ),
        labelContent: this.markerOnMap[0]?.TaskName,
        labelAnchor: new google.maps.Point(38, 0),
        labelClass: 'my-custom-class-for-label',
        labelInBackground: true,
      });
      marker.setMap(this.map);
      this.addInfoWindow(lat, lng, marker, this.markerOnMap[0], this.map);
      this.oms.addMarker(marker);
      this.map.setCenter(position);
      this.map.setZoom(19);
    } else {
      this.markerOnMap.forEach((item: any) => {
        item.Position.forEach((ele: any) => {
          let MarkerWithLabel = require('markerwithlabel')(google.maps);
          let position = new google.maps.LatLng(ele.Latitude, ele.Longitude);
          let marker = new MarkerWithLabel({
            map: this.map,
            draggable: false,
            position: position,
            icon: this.selectMarkerType(item._StatusTask_description),
            labelContent: item?.TaskName,
            labelAnchor: new google.maps.Point(38, 0),
            labelClass: 'my-custom-class-for-label',
            labelInBackground: true,
          });
          this.addInfoWindow(
            ele.Latitude,
            ele.Longitude,
            marker,
            item,
            this.map,
          );
          this.oms.addMarker(marker);
          bounds.extend(new google.maps.LatLng(ele.Latitude, ele.Longitude));
        });
      });
      this.map.fitBounds(bounds);
    }
  }

  selectMarkerType(iconType: any): string {
    return iconType == this.statuslookups[0]?.code
      ? '../../../../../content/images/livetracking/red_task.png'
      : iconType == this.statuslookups[2]?.code
      ? '../../../../../content/images/livetracking/grey_task.png'
      : '../../../../../content/images/livetracking/orange_task.png';
  }

  addInfoWindow(lat: any, lng: any, marker: any, item: any, map: any) {
    if (marker.infowindow) {
      marker.infowindow.close();
    }
    let infowindoContent = `<h3>${item?.TaskName}</h3>
    <label class="sourceName" style="background-color:${
      item?._SourceTask_description == this.SourceFilters[0]?.code
        ? this.SourceFilters[0]?.text_color
        : item?._SourceTask_description == this.SourceFilters[1]?.code
        ? this.SourceFilters[1]?.text_color
        : item?._SourceTask_description == this.SourceFilters[2]?.code
        ? this.SourceFilters[2]?.text_color
        : ''
    };">${item?._SourceTask_description}</label><br /><br />
     <span class="rowdata">
     <div class="dot mr-2 mt-1" style="background-color:${
       item?._StatusTask_description == this.statuslookups[0]?.code
         ? this.statuslookups[0]?.text_color
         : item?._StatusTask_description == this.statuslookups[2]?.code
         ? this.statuslookups[2]?.text_color
         : this.statuslookups[1]?.text_color
     };"></div>
      <p style="margin-right:10px">
        ${
          item?._StatusTask_description == this.statuslookups[0]?.code
            ? this.languageSelected == 'en'
              ? this.statuslookups[0]?.description
              : this.statuslookups[0]?._description_translation
            : item?._StatusTask_description == this.statuslookups[2]?.code
            ? this.languageSelected == 'en'
              ? this.statuslookups[2]?.description
              : this.statuslookups[2]?._description_translation
            : this.languageSelected == 'en'
            ? this.statuslookups[1]?.description
            : this.statuslookups[1]?._description_translation
        }
      </p>
     </span>
      
     ${
       item?.Inspectors != null
         ? '<p><i  class="ri-user-received-line px-2" matPrefix></i>' +
           item?.Inspectors +
           '</p>'
         : ' <button class="btn" type="button"  id=' +
           item.ScheduledTaskId +
           '>' +
           this.translateService.instant('monitoring.Assignto') +
           '</button>'
     }
      <br/><br/>
    `;
    marker.infowindow = new google.maps.InfoWindow({
      width: 380,
      maxWidth: 400,
    });
    google.maps.event.addListener(marker.infowindow, 'domready', () => {
      document
        .getElementById(`${item.ScheduledTaskId}`)
        ?.addEventListener('click', () => {
          this.showpopup(item);
        });
    });
    marker.infowindow.setContent(infowindoContent);
    this.oms.addListener('click', (marker: any, event: any) => {
      // this.hideAllInfoWindows(map, marker);
      marker.infowindow.open(map, marker);
    });
    this.oms.addListener('spiderfy', () => {
      marker.infowindow.close();
    });
    google.maps.event.addListener(this.map, 'click', (event: any) => {
      marker.infowindow.close();
    });
    this.oms.addListener(marker, 'click', (event: any) => {
      console.log('this is event', event);
      marker.infowindow.close();
    });
  }

  // hideAllInfoWindows(map: any, markers: any) {
  //   markers.forEach((marker: any) => {
  //     marker.infowindow.close(map, marker);
  //   });
  // }
  getSourceColor(item: any) {
    return item?._StatusTask_description == this.statuslookups[0]?.code
      ? this.statuslookups[0]?.text_color
      : item?._StatusTask_description == this.statuslookups[2]?.code
      ? this.statuslookups[2]?.text_color
      : this.statuslookups[1]?.text_color;
  }

  showpopup(Inspector: any) {
    console.log('Inspector');
    this.dialogService.open(AssignmentEditModalComponent, {
      dialogClass: this.languageSelected == 'ar-ly' ? 'rtl' : 'ltr',
      hasScroll: true,
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: {
        selectedItem: Inspector,
      },
    });
  }

  // <div style="padding-left: 20px; padding-right: 20px;">
  //               <h1>{{ item?.TaskName }}</h1>
  //               <span *ngFor="let ele of SourceFilters">
  //                 <label *ngIf="ele?.code == marker?._SourceTask_description" [ngStyle]="{ 'background-color': ele?.text_color }">{{
  //                   marker?._SourceTask_description
  //                 }}</label>
  //               </span>
  //               <br />
  //               <div
  //                 class="dot mr-2 "
  //                 [ngStyle]="{
  //                   'background-color':
  //                     marker?._StatusTask_description == statuslookups[0]?.code
  //                       ? statuslookups[0]?.text_color
  //                       : marker?._StatusTask_description == statuslookups[2]?.code
  //                       ? statuslookups[2]?.text_color
  //                       : statuslookups[1]?.text_color
  //                 }"
  //               ></div>
  //               <p>
  //                 {{
  //                   marker?._StatusTask_description == statuslookups[0]?.code
  //                     ? languageSelected == 'en'
  //                       ? statuslookups[0]?.description
  //                       : statuslookups[0]?._description_translation
  //                     : marker?._StatusTask_description == statuslookups[2]?.code
  //                     ? languageSelected == 'en'
  //                       ? statuslookups[2]?.description
  //                       : statuslookups[2]?._description_translation
  //                     : languageSelected == 'en'
  //                     ? statuslookups[1]?.description
  //                     : statuslookups[1]?._description_translation
  //                 }}
  //               </p>
  //               <br />
  //               <p><i *ngIf="marker?.Inspectors" class="ri-user-received-line px-2" matPrefix></i>{{ marker?.Inspectors }}</p>
  //               <button class="btn" *ngIf="!marker?.Inspectors" (click)="showpopup(marker)">{{ 'monitoring.Assignto' | translate }}</button>
  //             </div>

  // ==========================================================

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
