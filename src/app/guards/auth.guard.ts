import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router){}

  /*
  * Verifica en cada una de las rutas si el usuario está autenticado
  */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this._authService.isAuthenticated()){

        // Si el token expiró, desloguea y redirecciona al login
        if(this.isTokenExpired()){
          this._authService.logout();
          // Si no está autenticado lo redirecciona al login
          this._router.navigate(['/login']);
          return false;
        }
        return true;
      }

      // Si no está autenticado lo redirecciona al login
      this._router.navigate(['/login']);
      return false;
  }

  // Valida si el token expiró
  isTokenExpired(): boolean {
    // Obtiene el token
    let token = this._authService.token;

    // Obtiene el payload del token
    let payload = this._authService.generateToken(token);

    // Obtiene la fecha actual en segundos
    let now = new Date().getTime() / 1000;

    // Compara la fecha del payload con la fecha actual, si el payload es menor a la fecha actual entonces el token expiró
    if(payload.exp < now){
      return true;
    }

    return false;
  }
}
