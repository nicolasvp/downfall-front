import { Component, OnInit } from '@angular/core';
import { Genre } from '../../../interfaces/Genre';
import { GenreService } from '../../../services/genre.service';
import { Router } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddGenreComponent implements OnInit {

  private genre: Genre = new Genre();

  constructor(private _genreService: GenreService, private _router: Router) { }

  ngOnInit() {
  }

  // Guarda el nuevo género y luego redirige hacia todos los géneros
  public store(): void{
    console.log(this.genre);
    this._genreService.store(this.genre).subscribe(
      response => {
        this._router.navigate(['/genres'])
        $.toast({
         heading: 'Éxito',
         text: `El Género ${response.name} se ha creado correctamente.`,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'success',
         hideAfter: 3500,
         stack: 6
       });
      }
    );
  }

}
