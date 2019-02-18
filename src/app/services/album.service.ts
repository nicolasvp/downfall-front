import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Album } from '../interfaces/Album';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  private url: string = 'http://localhost:8080/api/albums';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // Obtiene todos los Albums, recibe un parametro booleano que indica si se debe formatear la fecha del album o no
  getAlbums(mustConvert: boolean): Observable<Album[]>{
    // Se iteran los albums y se cambia el formato de la fecha (releaseDate)
    return this._httpClient.get(this.url).pipe(
      map(response => {
        // Guarda todos los albums en la variable local album
        let albums = response as Album[];
        //Itera los albums guardados y cambia el formato de la fecha con formatDate
        return albums.map(album => {
          // Esta es una forma de hacer el pipe
          // album.releaseDate = formatDate(album.releaseDate, 'dd-MM-yyyy', 'en-US')

          if(mustConvert){
            // Formatea la fecha utilizando DatePipe
            let datePipe = new DatePipe('en-US');
            album.releaseDate = datePipe.transform(album.releaseDate, 'dd-MM-yyyy');
          }
          return album;
        })
      })
    );
  }

  // Guarda el nuevo album
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  store(album: Album): Observable<any>{
    return this._httpClient.post<any>(this.url, album, { headers: this.httpHeaders }).pipe(
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

  // Obtener los datos para actualizar Album, si obtiene un error desde el backend muestra una alerta y redirige al index de Albums
  getAlbum(id: number): Observable<Album>{
    return this._httpClient.get<Album>(`${this.url}/${id}`).pipe(
      map(
        album => {
            // Formatea la fecha utilizando DatePipe
            let datePipe = new DatePipe('en-US');
            // Se deja en formato yyyy-MM-dd para que el input date del form pueda setearlo y mostrarlo con formato dd-MM-yyyy(por el locale del browser)
            album.releaseDate = datePipe.transform(album.releaseDate, 'yyyy-MM-dd');
            return album;
        }
      ),
      catchError(e => {

        // Catch de error de tipo bad request(400) desde el backend, lo enviará hacia el componente para que lo maneje
        if(e.status == 400){
          return throwError(e);
        }

        this._router.navigate(['/albums']);
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

  // Actualiza los datos del Album
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  update(album: Album): Observable<any>{
    return this._httpClient.put<any>(`${this.url}/${album.id}`, album, { headers: this.httpHeaders }).pipe(
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

  // Elimina el Albuma
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
  uploadFile(file: File, id): Observable<Album>{
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    return this._httpClient.post(`${this.url}/upload/`, formData).pipe(
      map( (response: any) => response.album as Album),
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
