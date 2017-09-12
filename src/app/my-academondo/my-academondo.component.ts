import { Observable } from 'rxjs';
import { MarkerFactory } from './marker-factory';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { TileLayer, Map, LatLng, control, Marker as LeafletMarker } from 'leaflet';

@Component({
  selector: 'app-my-academondo',
  templateUrl: './my-academondo.component.html',
  styleUrls: ['./my-academondo.component.css']
})
export class MyAcademondoComponent implements OnInit {

  private namedMarkers: { [key: string]: LeafletMarker } = {};
  private map: Map;
  private markers: Observable<Marker>;

  private addMarker(marker: Marker) {

    this.removeMarker(marker.name);
    if (marker.hasPosition) {
      const position = new LatLng(marker.latitude, marker.longitude);
      console.log('Adding marker', position);
      this.namedMarkers[marker.name] = MarkerFactory.newMarker(position, false, marker.message).addTo(this.map);
      return this.namedMarkers[marker.name];
    }
  }

  private removeMarker(name: string): void {
    if (this.namedMarkers[name]) {
      console.log('Removing marker', name, this.namedMarkers[name].getLatLng());
      this.map.removeLayer(this.namedMarkers[name]);
      this.namedMarkers[name] = undefined;
    }
  }

 
	/*
	 * This is a specification of the leaflet options
	 * The reason to duplicate this object is so we can easily render it to the template
	 */
  optionsSpec: {
    layers: any[],
    zoom: number,
    center: number[]
  } = {
    layers: [
      {
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        maxZoom: 18,
        minZoom: 2,
        
        attribution: 'Open Street Map'
      }
    ],
    zoom: 3,
    center: [56.360029, 10.746635]
  };

  // Fields for managing the form inputs and binding to leaflet zoom/center
  model = new LeafletCoreDemoModel(
    this.optionsSpec.center[0],
    this.optionsSpec.center[1],
    this.optionsSpec.zoom
  );
  zoom: number;
  center: L.LatLng;

	/*
	 * This are the leaflet map options that we're going to use for input binding
	 */
  bounds = new L.LatLngBounds(new L.LatLng(49.5, -11.3), new L.LatLng(61.2, 2.5));
  options = {
    layers: this.optionsSpec.layers.map((l) => {
      return L.tileLayer(l.url, { maxZoom: l.maxZoom, minZoom: l.minZoom, attribution: l.attribution });
    }),
    zoom: this.optionsSpec.zoom,
    // maxBounds: this.bounds,
    maxBoundsViscosity: 1.0,
    center: L.latLng({ lat: this.optionsSpec.center[0], lng: this.optionsSpec.center[1] })
  };

  fitBoundsOptions = {
    padding: 100,
    maxZoom: 10,    
    animate: true,
    duration: 1
  };

  panOptions = {
    animate: true,
    duration: 1
  };

  zoomOptions = {
    animate: true,
    duration: 1
  };

  zoomPanOptions = {
    animate: true,
    duration: 1
  };

  onApply() {
    this.zoom = this.model.zoom;
    this.center = L.latLng([this.model.latitude, this.model.longitude]);

    return false;
  }  

  constructor() { }

  ngOnInit() {
    let test = new Marker('Simon', 56.2, 13, 'Watch out!');

    this.markers = Observable.of(test);

    // this.markers.subscribe(marker => this.addMarker(marker))
  }

}

export class LeafletCoreDemoModel {

  constructor(
    public latitude: number = 0,
    public longitude: number = 0,
    public zoom: number = 4,
    public zoomLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  ) { }
}

export class Marker {

  constructor(private _name: string, private _latitude: number, private _longitude: number, private _message: string = '') { }

  public get name() {
    return this._name;
  }
  public get latitude() {
    return this._latitude;
  }
  public get longitude() {
    return this._longitude;
  }

  public get message() {
    return this._message;
  }

  public get hasPosition(): boolean {
    return !!this.latitude && !!this.longitude;
  }
}

