import { Component, OnInit } from '@angular/core';
import { Genre } from '../../../interfaces/Genre';
import { GenreService } from '../../../services/genre.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-genre-form',
  templateUrl: './form.component.html'
})

export class GenreFormComponent implements OnInit {

  private genre: Genre = new Genre();
  private errors: string[]; // Maneja los errores que son devueltos desde el service

  constructor(private _genreService: GenreService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Se consulta por el id en url para saber si se está actualizando o creando un nuevo género
    this.loadGenre();
  }

  // Guarda el nuevo género y luego redirige hacia todos los géneros
  store(): void {
    this._genreService.store(this.genre).subscribe(
      response => {
        this._router.navigate(['/genres'])
        $.toast({
         heading: 'Éxito',
         text: `El Género ${response.genre.name} se ha creado.`,
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
    );
  }

  // Carga la información del género para mostrarlo en el formulario
  // Toma el parametro id de la url para solicitar la información, se consulta sólo si existe el parametro id
  loadGenre(): void {
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this._genreService.getGenre(id).subscribe(
          genre => this.genre = genre
        )
      }
    })
  }

  // Actualiza los datos del género enviando el objeto genre al servicio, luego redirige hacia todos los géneros
  update(): void {
    this._genreService.update(this.genre).subscribe(
      response => {
        this._router.navigate(['/genres'])
        $.toast({
         heading: 'Éxito',
         text: `El Género ${response.genre.name} se ha actualizado.`,
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

}
