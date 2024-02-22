import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router);
  errorLogin = signal(false);
  

  loginData: LoginData= {
    userName:"",
    password: "",
  }

  login(){
    this.errorLogin.set(false);
    this.authService.login(this.loginData).then(res => {
      if(res){
        this.router.navigate(["/conversor"]);
      }else {
        this.errorLogin.set(true)
      }
    });
  }
}
