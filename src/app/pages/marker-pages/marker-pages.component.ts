import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDv4 } from 'uuid'
import { JsonPipe } from '@angular/common';
import { filter } from 'rxjs';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker
}

@Component({
  selector: 'app-marker-pages',
  imports: [JsonPipe],
  templateUrl: './marker-pages.component.html',
  styles: ``,
})
export class MarkerPagesComponent implements AfterViewInit {

  public divElement = viewChild<ElementRef>('map');
  public map = signal<mapboxgl.Map | null>(null);
  public markers = signal<Marker[]>([])




  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.13716887932716, 4.545828218857238],
      zoom: 17,
    });
    // const maker = new mapboxgl.Marker({})
    // .setLngLat([-74.13716887932716, 4.545828218857238])
    // .addTo(map);
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event))

    this.map.set(map);
  }

  mapClick(event : mapboxgl.MapMouseEvent){
    if(!this.map()) return;

    const map = this.map();
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({
      color: color,
    })
    .setLngLat(event.lngLat)
    .addTo(map!);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: marker
    };
    this.markers.set([newMarker, ...this.markers()])
  }

  public flyToMarker( lngLat: LngLatLike ){

    if(!this.map()) return;

    this.map()?.flyTo({
      center: lngLat
    })
  }

  public deleteMarker(marker: Marker):void{

    if(!this.map()) return;
    const map =  this.map();

    marker.mapboxMarker.remove();
    this.markers.set( this.markers().filter( m => m.id !== marker.id))
  }
}
