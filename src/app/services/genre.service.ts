import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Genre } from '../interfaces/Genre';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private _httpClient: HttpClient) { }

  private url: string = 'http://localhost:8080/api/genres';

  getGenres(): Observable<Genre[]>{
    // Se realiza un cast del tipo Genre, tambien se puede hacer con un pipe y map
    return this._httpClient.get<Genre[]>(this.url);
  }
}
