import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private _user = new User();
  @Output() public loginStatus = new EventEmitter<boolean>();

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    if(this._authService.isAuthenticated()){
      this._user = this._authService.user;
    }
  }

  logout(): void{
    this._authService.logout();

    // Emite un evento hacia el app component para informar del estado del login(true)
    this.loginStatus.emit(this._authService.isAuthenticated());

    this._router.navigate(['/login']);
  }
}
