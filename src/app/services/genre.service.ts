import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Genre } from '../interfaces/Genre';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  private url: string = 'http://localhost:8080/api/genres';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // Obtiene todos los géneros
  getGenres(): Observable<Genre[]>{
    // Se realiza un cast del tipo Genre, tambien se puede hacer con un pipe y map
    return this._httpClient.get<Genre[]>(this.url);
  }

  // Guarda el nuevo género
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  store(genre: Genre): Observable<any>{
    return this._httpClient.post<any>(this.url, genre, { headers: this.httpHeaders }).pipe(
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

  // Obtener los datos para actualizar género, si obtiene un error desde el back muestra una alerta y redirige al index de generos
  getGenre(id: number): Observable<Genre>{
    return this._httpClient.get<Genre>(`${this.url}/${id}`).pipe(
      catchError(e => {

        // Catch de error de tipo bad request(400) desde el backend, lo enviará hacia el componente para que lo maneje
        if(e.status == 400){
          return throwError(e);
        }

        this._router.navigate(['/genres']);
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

  // Actualiza los datos del género
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  update(genre: Genre): Observable<any>{
    return this._httpClient.put<any>(`${this.url}/${genre.id}`, genre, { headers: this.httpHeaders }).pipe(
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

  // Elimina el géneros
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

  // Sube la imagen
  uploadFile(file: File, id): Observable<Genre>{
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    return this._httpClient.post(`${this.url}/upload/`, formData).pipe(
      map( (response: any) => response.genre as Genre),
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
