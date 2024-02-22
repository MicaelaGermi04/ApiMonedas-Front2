import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 auth = inject(AuthService);
 router = inject(Router); 

 isLoginPage(): boolean {
  if (this.router.url === '/login') {
    return true;
  }
  return false;
 }

 isAdmin(): boolean{
  if (this.auth.getRole() === 'Admin') {
    return true;
  } else {
    return false;
  }
 } 
}
