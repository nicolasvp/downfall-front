import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { GenreFormComponent } from './components/genres/form/form.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistFormComponent } from './components/artists/form/form.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumFormComponent } from './components/albums/form/form.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { TrackFormComponent } from './components/tracks/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/add', component: GenreFormComponent },
  { path: 'genres/edit/:id', component: GenreFormComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'artists/add', component: ArtistFormComponent },
  { path: 'artists/edit/:id', component: ArtistFormComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/add', component: AlbumFormComponent },
  { path: 'albums/edit/:id', component: AlbumFormComponent },
  { path: 'tracks', component: TracksComponent },
  { path: 'tracks/page/:page_number', component: TracksComponent },
  { path: 'tracks/add', component: TrackFormComponent },
  { path: 'tracks/edit/:id', component: TrackFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true });
