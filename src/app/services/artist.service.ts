import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Artist } from '../interfaces/Artist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  private url: string = 'http://localhost:8080/api/artists';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // Obtiene todos los artistas
  getArtists(): Observable<Artist[]>{
    // Se realiza un cast del tipo Artist, tambien se puede hacer con un pipe y map
    return this._httpClient.get<Artist[]>(this.url);
  }

  // Guarda el nuevo género
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  store(artist: Artist): Observable<any>{
    return this._httpClient.post<any>(this.url, artist, { headers: this.httpHeaders }).pipe(
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

  // Obtener los datos para actualizar artista, si obtiene un error desde el backend muestra una alerta y redirige al index de artistas
  getArtist(id: number): Observable<Artist>{
    return this._httpClient.get<Artist>(`${this.url}/${id}`).pipe(
      catchError(e => {

        // Catch de error de tipo bad request(400) desde el backend, lo enviará hacia el componente para que lo maneje
        if(e.status == 400){
          return throwError(e);
        }

        this._router.navigate(['/artists']);
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

  // Actualiza los datos del artista
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  update(artist: Artist): Observable<any>{
    return this._httpClient.put<any>(`${this.url}/${artist.id}`, artist, { headers: this.httpHeaders }).pipe(
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
    );;
  }

  // Elimina el artista
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
    );;
  }

}
