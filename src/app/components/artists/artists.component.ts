import { Component, OnInit } from '@angular/core';
import { Artist } from '../../interfaces/Artist';
import { ArtistService } from '../../services/artist.service';

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
          console.log(artists);
      }
    );
  }

}
