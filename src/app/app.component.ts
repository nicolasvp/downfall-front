import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'downfall-front';

  private loggedIn : boolean;

  constructor( private _authService: AuthService) {
    this.loggedIn = this._authService.isAuthenticated();
   }

  ngOnInit() {

  }

  // Obtiene el cambio de estado al hacer login
  loginStatus(status: boolean): void {
    this.loggedIn = status;
  }
}
