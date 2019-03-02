import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Aca se declaran componentes, servicios, etc de forma global

// Componentes
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { GenresComponent } from './components/genres/genres.component';
import { GenreFormComponent } from './components/genres/form/form.component';
import { ArtistFormComponent } from './components/artists/form/form.component';
import { AlbumFormComponent } from './components/albums/form/form.component';
import { TrackFormComponent } from './components/tracks/form/form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ShowComponent } from './components/albums/show/show.component';
import { LoginComponent } from './components/login/login.component';

// Pipes
import { SecondsToMinutes } from './pipes/secondsToMinutes';

// Rutas
import { app_routing } from './app.routes';

// Servicios
import { GenreService } from './services/genre.service';
import { ArtistService } from './services/artist.service';
import { AlbumService } from './services/album.service';
import { TrackService } from './services/track.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    GenresComponent,
    HomeComponent,
    ArtistsComponent,
    AlbumsComponent,
    TracksComponent,
    GenreFormComponent,
    ArtistFormComponent,
    AlbumFormComponent,
    TrackFormComponent,
    SecondsToMinutes,
    PaginatorComponent,
    ShowComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    app_routing,
    FormsModule,
  ],
  providers: [
    GenreService,
    ArtistService,
    AlbumService,
    TrackService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
