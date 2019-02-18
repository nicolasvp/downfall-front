import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Track } from '../interfaces/Track';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  private url: string = 'http://localhost:8080/api/tracks';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // Obtiene todos los tracks por página
  getTracks(page: number): Observable<any>{
    return this._httpClient.get(this.url + '/page/' + page).pipe(
      map( (response: any) => {
        return response;
      })
    );
  }

  // Guarda el nuevo track
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  store(track: Track): Observable<any>{

    // Se aplica pipe para volver a formatear la fecha del album a yyyy-MM-dd
    let datePipe = new DatePipe('en-US');
    track.album.releaseDate = datePipe.transform(track.album.releaseDate, 'yyyy-MM-dd');

    return this._httpClient.post<any>(this.url, track, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        // Catch de error de tipo bad request(400) desde el backend, lo enviará hacia el componente para que lo maneje
        if(e.status == 400){
          return throwError(e);
        }

        $.toast({
         heading: 'Error',
         text: e.error.msg,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'error',
         hideAfter: 3500
        });
        return throwError(e);
      })
    );
  }

  // Obtener los datos para actualizar el track, si obtiene un error desde el backend muestra una alerta y redirige al index de Tracks
  getTrack(id: number): Observable<Track>{
    return this._httpClient.get<Track>(`${this.url}/${id}`).pipe(
      catchError(e => {

        // Catch de error de tipo bad request(400) desde el backend, lo enviará hacia el componente para que lo maneje
        if(e.status == 400){
          return throwError(e);
        }

        this._router.navigate(['/tracks']);
        $.toast({
         heading: 'Error',
         text: e.error.msg,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'error',
         hideAfter: 3500
        });
        return throwError(e);
      })
    );
  }

  // Actualiza los datos del Track
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  update(track: Track): Observable<any>{

    // Se aplica pipe para volver a formatear la fecha del album a yyyy-MM-dd
    let datePipe = new DatePipe('en-US');
    track.album.releaseDate = datePipe.transform(track.album.releaseDate, 'yyyy-MM-dd');

    return this._httpClient.put<any>(`${this.url}/${track.id}`, track, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        $.toast({
         heading: 'Error',
         text: e.error.msg,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'error',
         hideAfter: 3500
        });
        return throwError(e);
      })
    );
  }

  // Elimina el Track
  delete(id: number): Observable<any>{
    return this._httpClient.delete<any>(`${this.url}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        $.toast({
         heading: 'Error',
         text: e.error.msg,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'error',
         hideAfter: 3500
        });
        return throwError(e);
      })
    );
  }
}
