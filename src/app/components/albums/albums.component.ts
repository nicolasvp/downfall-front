import { Component, OnInit } from '@angular/core';
import { Album } from '../../interfaces/album';
import { AlbumService } from '../../services/album.service';
declare var $ :any;

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];

  constructor(private _albumService: AlbumService) {  }

  ngOnInit() {
    // Obtiene todos los artistas para listarlos
    this._albumService.getAlbums().subscribe(
      albums => {
        this.albums = albums
        console.log(this.albums);
      }
    );
  }

  // Elimina el género seleccionado
  delete(album: Album): void{

    // Popup de confirmación para eliminar el registro
    if(confirm(`¿Está seguro de eliminar el album ${album.name}?`)){
      this._albumService.delete(album.id).subscribe(
        response => {

          // Filtra(quita) el artista eliminado de la lista de artistas
          this.albums = this.albums.filter(albums_list => albums_list !== album)

          $.toast({
           heading: 'Éxito',
           text: `El Album ${album.name} ha sido eliminado.`,
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
