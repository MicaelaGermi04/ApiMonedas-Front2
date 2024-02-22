import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { generarMensajeError, generarMensajeExito } from 'src/app/Helpers/messages';
import { Conversion } from 'src/app/Interfaces/conversion';
import { Currency } from 'src/app/Interfaces/currency';
import { Subscription } from 'src/app/Interfaces/subscription';
import { User } from 'src/app/Interfaces/user';
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

   userId: number | null = 0;
   amountOfConversionsDone: number = 0;
   availableConversions: number | undefined = 0;
   remainingConversions: number = 0;
   conversions: Conversion[] = [];
   p1: number = 1;
   p2: number = 1;
   
   userSub: UserSubscription = {
    subscriptionId: 0
   }
   user: User ={
    id: 0,
    userName: '',
    lastName: '',
    firstName: '',
    email: '',
    subscriptionId: 0,
  };

  // Suscripción seleccionada
  subscription: Subscription = {
    id: 0,
    name: "",
    amountOfConvertions: 0,
    price: "",
  };
  async ngOnInit() {
    this.conversions= await this.conversionService.getAllConversions();
    
    // Obtener el ID del usuario autenticado
    this.userId = this.auth.getUserId();  

    // Si hay un usuario autenticado, obtener su información y subscripcion
    if (this.userId !== null) {
      this.user = await this.userService.getUserById(this.userId)

      if (this.user.subscriptionId !== undefined) {
        this.availableConversions = await this.subscriptionService.getSubscriptionAmountConversions(this.user.subscriptionId);
         
        const subscription = await this.subscriptionService.getSubscriptionById(this.user.subscriptionId);
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

