import { Component, OnInit } from '@angular/core';
import { Artist } from '../../../interfaces/Artist';
import { Genre } from '../../../interfaces/Genre';
import { ArtistService } from '../../../services/artist.service';
import { GenreService } from '../../../services/genre.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-artist-form',
  templateUrl: './form.component.html'
})

export class ArtistFormComponent implements OnInit {

  private artist: Artist = new Artist();
  genres: Genre[] = [];
  private errors: string[]; // Maneja los errores que son devueltos desde el service

  constructor(private _artistService: ArtistService, private _genreService: GenreService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Se consulta por el id en url para saber si se está actualizando o creando un nuevo artista, esto se sabe por la url ya que si va un id entonces está editando
    this.loadArtist();
    this.loadGenres();
  }

  // Guarda el nuevo género y luego redirige hacia todos los géneros
  store(): void {

    if(this.artist.genre){
      // Quita el atributo artists de genero del json de artista, ya que sino causa error en el backend
      delete this.artist.genre["artists"]
    }
console.log(this.artist);
    this._artistService.store(this.artist).subscribe(
      response => {
        this._router.navigate(['/artists'])
        $.toast({
         heading: 'Éxito',
         text: `El Artista ${response.artist.name} se ha creado.`,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'success',
         hideAfter: 3500,
         stack: 6
       });
     },
     err => {
       this.errors = err.error.errors as string[];
         console.log(err);
     }
    );
  }

  // Carga la información del artista para mostrarla en el formulario
  // Toma el parametro id de la url para solicitar la información, se consulta sólo si existe el parametro id
  loadArtist(): void {
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this._artistService.getArtist(id).subscribe(
          artist => {
            this.artist = artist
          }
        )
      }
    })
  }

  // Carga la lista de géneros para rellenar el select del formulario
  loadGenres(): void {
    this._genreService.getGenres().subscribe(
      genres => {
        this.genres = genres
      }
    )
  }

  // Actualiza los datos del género enviando el objeto artist al servicio, luego redirige hacia todos los géneros
  update(): void {
    // Quita el atributo artists de genero del json de artista, ya que sino causa error en el backend
    delete this.artist.genre["artists"]
    this._artistService.update(this.artist).subscribe(
      response => {
        this._router.navigate(['/artists'])
        $.toast({
         heading: 'Éxito',
         text: `El Artista ${response.artist.name} se ha actualizado.`,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'success',
         hideAfter: 3500,
         stack: 6
       });
      },
      err => {
        this.errors = err.error.errors as string[];
        console.log(this.errors);
      }
    )
  }

  // Compara y setea el género del artista con la lista de los generos para dejarlo como seleccionado (selected) al editar
  compareGenre(input1: Genre, input2: Genre): boolean {
    if(input1 === undefined && input2 === undefined){
      return true;
    }
    return input1 === null || input2 === null || input1 === undefined || input2 === undefined ? false : input1.id === input2.id;
  }
}
