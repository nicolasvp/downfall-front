import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credentials_error: boolean = false;
  private user: User;
  @Output() public loginStatus = new EventEmitter<boolean>();

  constructor(private _authService: AuthService, private _router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    // Verifica si ya está autenticado el Usuario, si lo está no muestra el login sino que redirige hacia el home
    if(this._authService.isAuthenticated()){
      this._router.navigate(['/home']);
    }
  }

  login(): void{
    this._authService.login(this.user).subscribe(
      response => {
        this._authService.storeUser(response.access_token);
        this._authService.storeToken(response.access_token);
        this.credentials_error = false;

        // Obtiene el usuario mediante la invocacion del getter
        let user = this._authService.user;

        // Emite un evento hacia el app component para informar del estado del login(true)
        this.loginStatus.emit(this._authService.isAuthenticated());

        this._router.navigate(['/home']);
        $.toast({
         heading: 'Éxito',
         text: `Bienvenido ${user.username}!`,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'success',
         hideAfter: 3500,
         stack: 6
        });
      },
      error => {
        if(error.status == 400){
          this.credentials_error = true;
        }
      }
    )
  }

}
