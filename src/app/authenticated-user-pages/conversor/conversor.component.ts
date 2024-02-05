import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { generarMensajeError } from 'src/app/Helpers/messages';
import { Conversion } from 'src/app/Interfaces/conversion';
import { Currency } from 'src/app/Interfaces/currency';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ConversionService } from 'src/app/Services/conversion.service';
import { CurrencyService } from 'src/app/Services/currency.service';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { UserService } from 'src/app/Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss']
})
export class ConversorComponent implements OnInit{
   auth= inject(AuthService);
   conversionService= inject(ConversionService);
   currencyService= inject(CurrencyService);
   router= inject(Router);
   subscriptionService=inject(SubscriptionService);
   userService= inject(UserService);
   snackBar= inject(MatSnackBar);
   
   currencies: Currency[] = [];
   sortedCurrencies: Currency[] = [];
   userId: number | null = 0;
   amountOfConversionsDone: number = 0;
   availableConversions: number | undefined = 0;
   remainingConversions: number = 0; //Conversiones restantes
   conversionResult: number=0;
   errorConverting: WritableSignal<boolean> = signal(false);
   cargando: WritableSignal<boolean>= signal(false);

   user: User = {
    id: 0,
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    subscriptionId: 0,
  }

  conversion: Conversion = {
    userId: 0,
    firstCurrencyId: 0,
    secondCurrencyId: 0,
    fristCurrencyAmount: 0,
    firstCurrencyName: '',
    secondCurrencyName: '',
    convertedAmount: 0,
    date: new Date()
  }  

  async ngOnInit(){
    try{
      // Obtener todas las monedas
      this.currencies = await this.currencyService.getAll();
      this.sortedCurrencies= this.sortCurrencies(this.currencies);
    
      // Obtener el ID del usuario autenticado
      this.userId = this.auth.getUserId();
      console.log('ID USUARIO: '+this.userId);
      // Si hay un usuario autenticado, obtener su información de suscripción
      if (this.userId !== null) {
        this.user = await this.userService.getUserById(this.userId);
    
        console.log('Usuario subcripcion ID ' + this.user.subscriptionId);
        
        // Si el usuario tiene una suscripción, obtener la cantidad de conversiones disponibles
       if(this.user.subscriptionId !== undefined){
        this.availableConversions = await this.subscriptionService.getSubscriptionAmountConversions(this.user.subscriptionId);
        console.log('Conversiones disponibles: ' + this.availableConversions);
        await this.actualizarConversionesRestantes();
        console.log('Conversiones restantes: ' + this.remainingConversions);
       }
      }
    }catch(error){
      console.log(error);
    }
  }

  // Función para ordenar las monedas alfabéticamente
  sortCurrencies(currencies: Currency[]): Currency[] {
    return currencies.sort((a, b) => a.name.localeCompare(b.name)); //La función sort() se utiliza para ordenar los elementos de un array según un criterio de clasificación específico. 
                                                                    //En este caso, se utiliza la función localeCompare() en la propiedad name de los objetos Currency para realizar la comparación y ordenar los objetos en función de sus nombres.
  };

  //Funcion para convertir
  async convert(){
    this.errorConverting.set(false);

    //Id usuario autenticado
    this.userId= this.auth.getUserId();

    //Info usuario y su subscripcion
    if(this.userId === null) return console.log('Id del usuario nulo');
    this.user= await this.userService.getUserById(this.userId)
    if(this.user.subscriptionId === undefined) return console.log('Id de subscripcion nulo');
    this.availableConversions = await this.subscriptionService.getSubscriptionAmountConversions(this.user.subscriptionId);
    this.conversion.userId= this.userId;

    //validaciones
    if(!this.conversion) return console.log("No se realizo la conversion " + this.conversion);
    if(isNaN(this.conversion.fristCurrencyAmount)){  //NaN valor especial, se utiliza para represntar resultados que no son numeros validos en operaciones de punto flotante.
      return generarMensajeError('El monto a convertir debe ser un número');
    }
    if(this.conversion.fristCurrencyAmount <= 0){
      return generarMensajeError('El monto a convertir no puede ser negativo o nulo');
    }
    if(this.conversion.firstCurrencyId == this.conversion.secondCurrencyId){
      return generarMensajeError('Las monedas deben ser diferentes');
    }
    if(this.remainingConversions<=0){
      Swal.fire({
        title: "No tienes más conversiones disponibles",
        icon: "error",
        footer: '<a href="/subscription">Cambiar subscripción</a>'
      });
    }
     
    //Conversion
    const res = await this.conversionService.PerformConversion(this.conversion);
    console.log("Respuesta: "+res);

    //Manejo resultado conversion
    if(res){
      this.conversionResult= res;
      await this.actualizarConversionesRestantes();

      // Si no quedan conversiones, redirigir al usuario
      if(this.remainingConversions === 0){
        this.snackBar.open('Debes cambiar tu subscripcion para seguir convirtiendo', 'Cerrar', {
          duration: 5000,
        });
        return this.router.navigate(['/subscription']);
      }
    }else{
      this.errorConverting.set(true);
    }
  }

  async actualizarConversionesRestantes(){
    this.amountOfConversionsDone = await this.conversionService.getAmountOfConversions();
    console.log(this.amountOfConversionsDone);

    if(this.availableConversions !== undefined){
      this.remainingConversions = this.availableConversions - this.amountOfConversionsDone;
    }
    return 0;
  }
}
