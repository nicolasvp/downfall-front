import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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

// Rutas
import {app_routing} from './app.routes';

// Servicios
import { GenreService } from './services/genre.service';
import { AddGenreComponent } from './components/genres/add/add.component';

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
    AddGenreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    app_routing,
  ],
  providers: [
    GenreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
