import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { AddGenreComponent } from './components/genres/add/add.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { HomeComponent } from './components/home/home.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/add', component: AddGenreComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'tracks', component: TracksComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true });
