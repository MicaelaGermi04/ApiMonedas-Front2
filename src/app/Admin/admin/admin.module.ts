import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NewCurrencyComponent } from 'src/app/Components/new-currency/new-currency.component';
import { NewUserComponent } from 'src/app/Components/new-user/new-user.component';
import { EditUserComponent } from 'src/app/Components/edit-user/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NewCurrencyComponent,
    NewUserComponent,
    EditUserComponent,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class AdminModule { }
