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
        return true;
      }

      // Si no está autenticado lo redirecciona al login
      this._router.navigate(['/login']);
      return false;
  }
}
