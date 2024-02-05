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
  isSmallScreen= false;
  constructor(private breakpointObserver: BreakpointObserver){}
 ngOnInit(){
  this.breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {
    this.isSmallScreen = result.matches;
  });
 }

 auth = inject(AuthService);
 router = inject(Router); 

 isLoginPage(): boolean {
  return this.router.url === '/login';
 }

 isAdmin(): boolean{
  return this.auth.getRole() === 'Admin';
 }
}
