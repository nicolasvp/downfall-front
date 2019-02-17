import { Component, OnInit } from '@angular/core';
import { Artist } from '../../interfaces/Artist';
import { ArtistService } from '../../services/artist.service';
declare var $ :any;

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  artists: Artist[] = [];

  constructor(private _artistService: ArtistService) { }

  ngOnInit() {
    // Obtiene todos los artistas para listarlos
    this._artistService.getArtists().subscribe(
      artists => {
        this.artists = artists
      }
    );
  }

  // Elimina el género seleccionado
  delete(artist: Artist): void{

    // Popup de confirmación para eliminar el registro
    if(confirm(`¿Está seguro de eliminar el artista ${artist.name}?`)){
      this._artistService.delete(artist.id).subscribe(
        response => {

          // Filtra(quita) el artista eliminado de la lista de artistas
          this.artists = this.artists.filter(artists_list => artists_list !== artist)

          $.toast({
           heading: 'Éxito',
           text: `El Artista ${artist.name} ha sido eliminado.`,
           position: 'top-right',
           loaderBg:'#ff6849',
           icon: 'success',
           hideAfter: 3500,
           stack: 6
          });

        }
      )
    }
  }
}
