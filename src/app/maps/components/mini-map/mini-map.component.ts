import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken  = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: ``
})
export class MiniMapComponent {
  public divElement = viewChild<ElementRef>('map');
  public map = signal<mapboxgl.Map | null>(null);

  public lngLat = input.required<LngLatLike | undefined>();


  ngAfterViewInit(): void {
    if (!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: 14,
      interactive: false,
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()!).addTo(map);
  }
}
