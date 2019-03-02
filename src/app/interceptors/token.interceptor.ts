import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Pass untouched request through to the next request handler.
* Intercepta las peticiones Http y le agrega el headers con authorization
*/
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    // Obtiene el token
    let token = this._authService.token;

    if(token != null){
      // Modifica el headers agregando el authorization con el token
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(authReq);
    }
    
    return next.handle(req);

  }
}
