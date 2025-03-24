import { Routes } from '@angular/router';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { HousesPagesComponent } from './pages/houses-pages/houses-pages.component';
import { MarkerPagesComponent } from './pages/marker-pages/marker-pages.component';

export const routes: Routes = [

  {
    path: 'fullscreen',
    title: 'Pantalla Completa',
    component: FullScreenPageComponent
  },
  {
    path: 'marker',
    title: 'Marcadores',
    component: MarkerPagesComponent
  },
  {
    path: 'houses',
    title: 'Casas',
    component: HousesPagesComponent
  },
  {
    path: '**',
    redirectTo: 'fullscreen'
  }
];
