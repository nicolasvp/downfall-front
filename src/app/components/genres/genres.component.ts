import { Component, OnInit } from '@angular/core';
import { Genre } from '../../interfaces/Genre';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres: Genre[] = [];

  constructor(private _genreService: GenreService) { }

  ngOnInit() {
    this._genreService.getGenres().subscribe(
      genres => {
        this.genres = genres
      }
    );
  }

}
