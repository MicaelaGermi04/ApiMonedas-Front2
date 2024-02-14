import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "src/app/Interfaces/subscription";
import { generarMensajeError, generarMensajeExito } from "src/app/Helpers/messages";
import { Conversion } from "src/app/Interfaces/conversion";
import { Currency } from "src/app/Interfaces/currency";
import { User } from "src/app/Interfaces/user";
import { AuthService } from "src/app/Services/auth.service";
import { CurrencyService } from "src/app/Services/currency.service";
import { SubscriptionService } from "src/app/Services/subscription.service";
import { UserService } from "src/app/Services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent{
  router= inject(Router);
  auth= inject(AuthService);
  userService= inject(UserService);
  currencyService= inject(CurrencyService);
  subscriptionService = inject(SubscriptionService);

  users: User[] = [];
  currencies: Currency[]=[];
  conversions: Conversion[]=[];
  subscriptions: Subscription[]=[]
  userId: number | null = 0;

  p1: number = 1;
  p2: number= 1;
  p3:number= 1;
  async ngOnInit(){

    this.users= await this.userService.getAll();
    console.log(this.users);

    this.currencies = await this.currencyService.getAll();
    console.log(this.currencies);

    this.subscriptions= await this.subscriptionService.getAll();
    console.log(this.subscriptions)
  }
    
  async deleteCurrency(currencyId: number){
    const userRole = await this.auth.getRole();
    if(userRole == "Admin"){
      Swal.fire({
        title: '¿Estás seguro de que quieres eliminar esta moneda?',
        showCancelButton: true,
        confirmButtonColor: '#202ece',
        cancelButtonColor: '#b7b7b7',
        cancelButtonText: 'Volver',
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if(result.isConfirmed){
          this.currencyService.deleteCurrency(currencyId).then((res) => {
            if(res){
              this.getAllCurrencies();
              generarMensajeExito("Moneda eliminada exitosamente")
            }else{
              generarMensajeError("Error eliminando la moneda. Intente nuevamente")
              console.log(res);
            }
          });
        }
      });
    }  
  }
  
  async getAllCurrencies(){
    this.users= await this.userService.getAll();
 }


 async deleteUser(userId: number){
  const userRole= await this.auth.getRole();
  if(userRole === "Admin"){
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar este usuario?',
      showCancelButton: true,
      confirmButtonColor: '#202ece',
      cancelButtonColor: '#b7b7b7',
      cancelButtonText: 'Volver',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.deleteUser(userId).then((res) => {
          if(res){
            this.getAllUsers();
            generarMensajeExito("Usuario eliminado exitosamente");
          }else{
            generarMensajeError("Error eliminado el usuario. Intente nuevamente")
          }
        });
      }
    });
  }
}

  async getAllUsers(){
    this.currencies= await this.currencyService.getAll();
  }
}
