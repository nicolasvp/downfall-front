import { Component, OnInit } from '@angular/core';
import { Track } from '../../../interfaces/Track';
import { Album } from '../../../interfaces/Album';
import { AlbumService } from '../../../services/album.service';
import { TrackService } from '../../../services/track.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $ :any;

@Component({
  selector: 'app-track-form',
  templateUrl: './form.component.html'
})

export class TrackFormComponent implements OnInit {

  private track: Track = new Track();
  albums: Album[] = [];
  private errors: string[]; // Maneja los errores que son devueltos desde el service

  constructor(private _trackService: TrackService, private _albumService: AlbumService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Se consulta por el id en url para saber si se está actualizando o creando un nuevo Albuma, esto se sabe por la url ya que si va un id entonces está editando
    this.loadTrack();
    this.loadAlbums();
  }

  // Guarda el nuevo género y luego redirige hacia todos los géneros
  store(): void {
    if(this.track.album){
      // Quita el atributo artist de album del json de track, ya que sino causa error en el backend
       delete this.track.album.artist
    }

    this._trackService.store(this.track).subscribe(
      response => {
        this._router.navigate(['/tracks'])
        $.toast({
         heading: 'Éxito',
         text: `La canción ${response.track.name} se ha creado.`,
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

  // Carga la información del Track para mostrarla en el formulario
  // Toma el parametro id de la url para solicitar la información, se consulta sólo si existe el parametro id
  loadTrack(): void {
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this._trackService.getTrack(id).subscribe(
          track => {
            this.track = track
          }
        )
      }
    })
  }

  // Carga la lista de albums para rellenar el select del formulario, envia el parametro false para indicar que no se debe formatear la fecha de los albums
  loadAlbums(): void {
    this._albumService.getAlbums(false).subscribe(
      albums => {
        this.albums = albums
      }
    )
  }

  // Actualiza los datos del track enviando el objeto Track al servicio, luego redirige hacia todos los tracks
  update(): void {

    if(this.track.album){
      // Quita el atributo artist de album del json de track, ya que sino causa error en el backend
       delete this.track.album.artist
    }

    this._trackService.update(this.track).subscribe(
      response => {
        this._router.navigate(['/tracks'])
        $.toast({
         heading: 'Éxito',
         text: `La canción ${response.track.name} se ha actualizado.`,
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
    )
  }

  // Compara y setea el album del track con la lista de los albums para dejarlo como seleccionado (selected) al editar
  compareAlbum(input1: Album, input2: Album): boolean {
    if(input1 === undefined && input2 === undefined){
      return true;
    }
    return input1 === null || input2 === null || input1 === undefined || input2 === undefined ? false : input1.id === input2.id;
  }
}
