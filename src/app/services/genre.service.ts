import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Genre } from '../interfaces/Genre';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private _httpClient: HttpClient) { }

  private url: string = 'http://localhost:8080/api/genres';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // Obtiene todos los géneros
  getGenres(): Observable<Genre[]>{
    // Se realiza un cast del tipo Genre, tambien se puede hacer con un pipe y map
    return this._httpClient.get<Genre[]>(this.url);
  }

  // Guarda el nuevo género
  store(genre: Genre): Observable<Genre>{
    return this._httpClient.post<Genre>(this.url, genre, { headers: this.httpHeaders });
  }

  // Obtener los datos para actualizar género
  getGenre(id): Observable<Genre>{
    return this._httpClient.get<Genre>(`${this.url}/${id}`);
  }

  // Actualiza los datos del género
  update(genre: Genre): Observable<Genre>{
    return this._httpClient.put<Genre>(`${this.url}/${genre.id}`, genre, { headers: this.httpHeaders });
  }

  // Elimina el géneros
  delete(id: number): Observable<Genre>{
    return this._httpClient.delete<Genre>(`${this.url}/${id}`, { headers: this.httpHeaders });
  }
}
