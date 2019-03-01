import { Component, OnInit } from '@angular/core';
import { Album } from '../../interfaces/album';
import { AlbumService } from '../../services/album.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $ :any;

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];
  album_parent: Album;

  constructor(private _albumService: AlbumService, private _authService: AuthService) {  }

  ngOnInit() {
    // Obtiene todos los albums para listarlos
    this._albumService.getAlbums(true).subscribe(
      albums => {
        this.albums = albums
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

  // Abre el modal donde se muestra el detalle del album
  // Utiliza el metodo openModal del servicio de Modal
  show(album: Album): void{
    this.album_parent = album;
    $("#show_modal").modal('show');
  }

}
