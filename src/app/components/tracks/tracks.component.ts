import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { Track } from '../../interfaces/Track';
import { ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  tracks: Track[] = [];
  parent_paginator: any;

  constructor(private _trackService: TrackService, private _activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activedRoute.paramMap.subscribe(params => {
      // Obtiene el parámetro page_number y los castea de String a Number con el signo '+'
      let page_number: number = +params.get('page_number');

      // Si no está definido entonces toma como valor por defecto 0
      if(!page_number){
        page_number = 0;
      }

      // Se accede al content ya que los resultados vienen páginados
      this._trackService.getTracks(page_number).subscribe(
        response => {
          this.tracks = response.content;
          this.parent_paginator = response;
        }
      )
    })
  }

  // Elimina el track seleccionado
  delete(track: Track): void{

    // Popup de confirmación para eliminar el registro
    if(confirm(`¿Está seguro de eliminar la canción ${track.name}?`)){
      this._trackService.delete(track.id).subscribe(
        response => {

          // Filtra(quita) el track eliminado de la lista de tracks
          this.tracks = this.tracks.filter(track_list => track_list !== track)

          $.toast({
           heading: 'Éxito',
           text: `La canción ${track.name} ha sido eliminada.`,
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
