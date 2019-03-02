import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
declare var $ :any;

/** Pass untouched request through to the next request handler.
* Intercepta las respuestas y maneja los errors 401 y 403
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError(e => {
        // No autenticado
        if(e.status == 401){

          // Si el token expiró entonces cierra la sesión
          if(this._authService.isAuthenticated()){
            this._authService.logout();
          }

          this._router.navigate(['/login']);
        }

        // Permisos denegados
        if(e.status == 403){
          this._router.navigate(['/home']);
          $.toast({
           heading: 'Permiso denegado',
           text: 'No tiene permiso para acceder a esta sección.',
           position: 'top-right',
           loaderBg:'#ff6849',
           icon: 'warning',
           hideAfter: 3500,
           stack: 6
         });
        }

        return throwError(e);
      })
    );

  }
}
