import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { generarMensajeError, generarMensajeExito } from 'src/app/Helpers/messages';
import { Conversion } from 'src/app/Interfaces/conversion';
import { Currency } from 'src/app/Interfaces/currency';
import { Subscription } from 'src/app/Interfaces/subscription';
import { UserSubscription } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ConversionService } from 'src/app/Services/conversion.service';
import { CurrencyService } from 'src/app/Services/currency.service';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit{
  router = inject(Router);
  auth = inject(AuthService);
  userService = inject(UserService);
  currencyService = inject(CurrencyService);
  subscriptionService = inject(SubscriptionService);
  conversionService = inject(ConversionService);

   // Señales y variables para el manejo del estado
   userId: number | null = 0;
   amountOfConversionsDone: number = 0;
   availableConversions: number | undefined = 0;
   remainingConversions: number = 0;
   conversions: WritableSignal<Conversion[]> = signal([]);
   subscriptions:Subscription[] =[];
   editingMode = signal(false);
   p1: number = 1;
   p2: number = 1;
   
   user: UserSubscription = {
    subscriptionId: 0
  }

  // Suscripción seleccionada
  subscription: Subscription = {
    id: 0,
    name: "",
    amountOfConversions: 0,
    price: "",
  };
  async ngOnInit() {
    
    // Lista de conversiones realizadas
    this.conversionService.getAllConversions().then(res => {
      this.conversions.set(res);
    })
    // Suscripciones
    this.subscriptionService.getAll().then((res)=> {
      this.subscriptions = res;
      console.log(this.subscriptions);
    })

    // Obtener el ID del usuario autenticado
    this.userId = this.auth.getUserId();  

    // Si hay un usuario autenticado, obtener su información de suscripción
    if (this.userId !== null) {
      this.user = await this.userService.getUserById(this.userId)
      console.log(this.user);

      // Si el usuario tiene una suscripción, obtener la cantidad de conversiones disponibles
      if (this.user.subscriptionId !== undefined) {
        this.availableConversions = await this.subscriptionService.getSubscriptionAmountConversions(this.user.subscriptionId);
         
        const subscription = await this.subscriptionService.getSubscriptionById(this.user.subscriptionId);
        console.log(this.subscription);
        if (subscription !== undefined) {
          this.subscription= subscription;
        }
        await this.actualizarConversionesRestantes();
      }
    }
    this.subscription.name = this.subscription.name;
  }

  async actualizarConversionesRestantes() {
    this.amountOfConversionsDone = await this.conversionService.getAmountOfConversions();

    if (this.availableConversions !== undefined) {
      this.remainingConversions = this.availableConversions - this.amountOfConversionsDone;
    }
    return 0;
  }
  
}

