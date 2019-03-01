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
import { AuthGuard } from './guards/auth.guard';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'genres', component: GenresComponent, canActivate:[AuthGuard]},
  { path: 'genres/add', component: GenreFormComponent, canActivate:[AuthGuard]},
  { path: 'genres/edit/:id', component: GenreFormComponent, canActivate:[AuthGuard]},
  { path: 'artists', component: ArtistsComponent, canActivate:[AuthGuard]},
  { path: 'artists/add', component: ArtistFormComponent, canActivate:[AuthGuard] },
  { path: 'artists/edit/:id', component: ArtistFormComponent, canActivate:[AuthGuard] },
  { path: 'albums', component: AlbumsComponent, canActivate:[AuthGuard] },
  { path: 'albums/add', component: AlbumFormComponent, canActivate:[AuthGuard] },
  { path: 'albums/edit/:id', component: AlbumFormComponent, canActivate:[AuthGuard] },
  { path: 'tracks', component: TracksComponent, canActivate:[AuthGuard] },
  { path: 'tracks/page/:page_number', component: TracksComponent, canActivate:[AuthGuard] },
  { path: 'tracks/add', component: TrackFormComponent, canActivate:[AuthGuard] },
  { path: 'tracks/edit/:id', component: TrackFormComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home', canActivate:[AuthGuard] }
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true });
