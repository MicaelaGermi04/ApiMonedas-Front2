import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from '../../Interfaces/subscription';
import { UserSubscription } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ConversionService } from 'src/app/Services/conversion.service';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})

export class SubscriptionComponent implements OnInit{
  authService = inject(AuthService);
  subscriptionService = inject(SubscriptionService);
  userService = inject(UserService);
  router = inject(Router);
  conversionService = inject(ConversionService);

  userId: number | null = 0;
  user: UserSubscription = {
    subscriptionId: 0,
  }

  subscriptions: Subscription[]=[];

  subscription: Subscription= {
    id: 0,
    name: "",
    amountOfConvertions: 0,
    price: "",
  }

  async ngOnInit(){
    this.subscriptions= await this.subscriptionService.getAll()

    this.userId= this.authService.getUserId();

    if(this.userId !== null){
      this.user = await this.userService.getUserById(this.userId);
      console.log('Id de subscripcion del usuario ' + this.user.subscriptionId);
    }
  }

  async editUserSubscription(subscriptionId: number){
    //Id usuario
    const userId= this.authService.getUserId();
    //Usuario no autenticado. El valor retornado será undefined.
    if(!userId) return;

    const subscription = await this.subscriptionService.getSubscriptionById(subscriptionId);
  

    Swal.fire({
      title: 'Has seleccionado la suscripción ' + subscription?.name,
      showCancelButton: true,
      confirmButtonColor: '#001dbd',
      cancelButtonColor: '#b7b7b7',
      cancelButtonText: 'Volver',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      // Si el usuario confirma, realizar la edición de la suscripción
      if (result.isConfirmed) {
        this.userService.editUserSubscription(userId, subscriptionId).then((res) => {
          if (res) {
            this.router.navigate(['/conversor']);
          } else {
            Swal.fire(
              'Ha ocurrido un error al seleccionar tu suscripción',
              'Intenta nuevamente.',
              'error'
            );
          }
        });
      }
    });
  }
}