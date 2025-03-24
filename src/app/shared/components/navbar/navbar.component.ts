import { Component, inject, signal } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  public router = inject(Router);

  public routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? 'Mapas en Angular'}`
  })).filter(route  => route.path !== '**');

  public pageTitle$ = this.router.events.pipe(
    filter( event => event instanceof NavigationEnd),
    map( event => event.url),
    map( url => routes.find( route => `/${ route.path }` ===  url)?.title)
  )
}
