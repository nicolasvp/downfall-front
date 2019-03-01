import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Artist } from '../interfaces/Artist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private _httpClient: HttpClient, private _router: Router, private _authService: AuthService) { }

  private url: string = 'http://localhost:8080/api/artists';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // Agrega token a la cabecera
  private addAuthorizationToHeaders(){
    // Obtiene token mediante el getter
    let token = this._authService.token;

    // Si el token no es nulo lo agrega a las cabeceras
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.httpHeaders;
  }

  // Obtiene todos los artistas
  getArtists(): Observable<Artist[]>{
    // Se realiza un cast del tipo Artist, tambien se puede hacer con un pipe y map
    return this._httpClient.get<Artist[]>(this.url, { headers: this.addAuthorizationToHeaders() });
  }

  // Guarda el nuevo artista
  // Se deja el tipo de retorno como any por el wraper del responseEntity de Spring
  store(artist: Artist): Observable<any>{
    return this._httpClient.post<any>(this.url, artist, { headers: this.addAuthorizationToHeaders() }).pipe(
      catchError(e => {

        if(e.status == 401 || e.status == 403){
          this.isNotAuthorized(e);
          return throwError(e);
        }

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
    return this._httpClient.get<Artist>(`${this.url}/${id}`, { headers: this.addAuthorizationToHeaders() }).pipe(
      catchError(e => {

        if(e.status == 401 || e.status == 403){
          this.isNotAuthorized(e);
          return throwError(e);
        }

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
    return this._httpClient.put<any>(`${this.url}/${artist.id}`, artist, { headers: this.addAuthorizationToHeaders() }).pipe(
      catchError(e => {

        if(e.status == 401 || e.status == 403){
          this.isNotAuthorized(e);
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

  // Elimina el artista
  delete(id: number): Observable<any>{
    return this._httpClient.delete<any>(`${this.url}/${id}`, { headers: this.addAuthorizationToHeaders() }).pipe(
      catchError(e => {

        if(e.status == 401 || e.status == 403){
          this.isNotAuthorized(e);
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

  // Sube la imagen
  uploadFile(file: File, id): Observable<Artist>{
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    return this._httpClient.post(`${this.url}/upload/`, formData, { headers: this.addAuthorizationToHeaders() }).pipe(
      map( (response: any) => response.artist as Artist),
      catchError(e => {

        if(e.status == 401 || e.status == 403){
          this.isNotAuthorized(e);
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

  // Revisa si el error es 401 o 403 y lanza una alerta
  isNotAuthorized(e): boolean{

    // No autenticado
    if(e.status == 401){

      // Si el token expiró entonces cierra la sesión
      if(this._authService.isAuthenticated()){
        this._authService.logout();
      }
      
      this._router.navigate(['/login']);
      return true;
    }

    // Permisos denegados
    if(e.status == 403){
      this._router.navigate(['/artists']);
      $.toast({
       heading: 'Permiso denegado',
       text: 'No tiene permiso para acceder a esta sección.',
       position: 'top-right',
       loaderBg:'#ff6849',
       icon: 'warning',
       hideAfter: 3500,
       stack: 6
     });
      return true;
    }

    return false;
  }
}
