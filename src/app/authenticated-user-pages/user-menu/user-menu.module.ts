import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserMenuRoutingModule } from './user-menu-routing.module';
import { UserMenuComponent } from './user-menu.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    UserMenuRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ]
})
export class UserMenuModule { }
