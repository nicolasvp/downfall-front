import { Component, OnInit } from '@angular/core';
import { Genre } from '../../interfaces/Genre';
import { GenreService } from '../../services/genre.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $ :any;

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres: Genre[] = [];

  constructor(private _genreService: GenreService, private _authService: AuthService) { }

  ngOnInit() {
    // Obtiene todos los géneros para listarlos
    this._genreService.getGenres().subscribe(
      genres => {
        this.genres = genres
      }
    );
  }

  // Elimina el género seleccionado
  delete(genre: Genre): void{

    // Popup de confirmación para eliminar el registro
    if(confirm(`¿Está seguro de eliminar el género ${genre.name}?`)){
      this._genreService.delete(genre.id).subscribe(
        response => {

          // Filtra(quita) el género eliminado de la lista de géneros
          this.genres = this.genres.filter(genre_list => genre_list !== genre)

          $.toast({
           heading: 'Éxito',
           text: `El Género ${genre.name} ha sido eliminado.`,
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
