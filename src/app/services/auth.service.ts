import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) {  }

  private url: string = 'http://localhost:8080/oauth/token';
  private appCredentials: string = btoa('angular-downfall' + ':' +'123123');
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + this.appCredentials
  });

  private _token: string;
  private _user = new User();

  // Obtiene el usuario desde la variable user o desde el sessionStorage
  public get user(): User{
    if(this._user != null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }else if(this._user == null && sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    // Si no está el usuario entonces retorna un nuevo usuario con todos los atributos vacios
    return new User();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      // this._token = JSON.parse(sessionStorage.getItem('token'));
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    // Si no está el token se retorna un null
    return null;
  }

  // Retorna los datos del login desde el backend
  login(user: User): Observable<any>{

    // Convierte los parametros en una URL: grant_type=password&username=blabla&bleble=12345
    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this._httpClient.post<any>(this.url, params.toString(), { headers: this.httpHeaders });
  }

  // Cierra la sesión del usuario, borra el user y token del caché
  logout(): void{
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  // Guarda el usuario con todos sus datos en Session storage
  storeUser(accessToken: string): void{
    let payload = this.generateToken(accessToken);

    // Instancia user si es nulo
    if(this._user == null){
      this._user = new User();
    }

    if(payload != null){
      this._user.name = payload.name;
      this._user.email = payload.email;
      this._user.username = payload.user_name;
      this._user.roles = payload.authorities;
      sessionStorage.setItem('user', JSON.stringify(this._user));
    }
  }

  // Guarda el token en Session storage
  storeToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  // Convierte en json la informacion del token(payload(cuerpo)), desencripta de base64
  generateToken(accessToken: string): any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean{
    // Se obtiene el token desde el getter, por esto no se ocupa _token que es una variable
    let payload = this.generateToken(this.token);

    // Comprueba si está autenticado
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }

    return false;
  }
}
