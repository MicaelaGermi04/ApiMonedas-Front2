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
  cargando = signal(false);
  

  loginData: LoginData= {
    userName:"",
    password: ""
  }

  login(){
    this.errorLogin.set(false);
    this.cargando.set(true);
    this.authService.login(this.loginData).then(res => {
      if(res){
        const SubsId = this.authService.getSubscriptionId()
        console.log(SubsId); //Borrar despues de probar
        if(SubsId === "1" || SubsId === "2" || SubsId === "3" )
        {
          this.router.navigate(["/conversor"])
        }
        else{
          this.router.navigate(["/subscription"])
        }
      }
      else {
        this.errorLogin.set(true)
      };
      this.cargando.set(false);
    });
  }
}
