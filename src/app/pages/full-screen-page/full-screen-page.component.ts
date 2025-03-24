import { map } from 'rxjs';
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken  = environment.mapboxKey;

@Component({
  selector: 'app-full-screen-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './full-screen-page.component.html',
  styles: `
    div{
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls{
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    position: fixed;
    bottom: 25px;
    right: 20px;
    z-index: 9999;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    width: 250px;
  }
  `
})
export class FullScreenPageComponent implements AfterViewInit{

  public divElement = viewChild<ElementRef>('map');
  public map = signal<mapboxgl.Map | null>(null);

  public zoom = signal(5);
  public coordinates =signal({
    lng: 5.0328527,
    lat: -74.373882,
  })

  public zoomEffect = effect(() =>{
    if(!this.map()) return;

    this.map()?.setZoom(this.zoom());
  })

  public async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;
    const {lat, lng} = this.coordinates();
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lat, lng], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });
     this.mapListeners(map);
  }

  public mapListeners(map : mapboxgl.Map){

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    })

    map.on('moveend', () => {
      const center  = map.getCenter();
      this.coordinates.set(center);
    })

    map.addControl( new mapboxgl.FullscreenControl());
    map.addControl( new mapboxgl.NavigationControl());

    this.map.set(map);
  }

}
