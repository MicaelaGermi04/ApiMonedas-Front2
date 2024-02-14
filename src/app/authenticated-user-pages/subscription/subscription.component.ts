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

  //Lista subscripciones
  subscriptions: Subscription[]=[];

  //Subs seleccionada
  subscription: Subscription= {
    id: 0,
    name: "",
    amountOfConvertions: 0,
    price: "",
  }

  async ngOnInit(){
    this.subscriptionService.getAll().then((res)=> {
      this.subscriptions = res;
      console.log(this.subscriptions);
    })

    this.userId= this.authService.getUserId();
    console.log('Id de usuario: ' + this.userId);
    if(this.userId !== null){
      this.user = await this.userService.getUserById(this.userId);
      console.log('Id de subscripcion del usuario ' + this.user.subscriptionId);
    }
  }

  async editUserSubscription(subscriptionId: number){
    //Id usuario
    const userId= this.authService.getUserId();

    const subscription = await this.subscriptionService.getSubscriptionById(subscriptionId);
    console.log("Subscripcion: " + subscription);
    const subscriptionName= subscription?.name;
    console.log("Nombre subscripcion: " + subscriptionName)

    //Usuario no autenticado
    //Si la condición !userId es verdadera, el código retornará inmediatamente y no ejecutará el resto del código. El valor retornado será undefined.
    if(!userId) return;

    Swal.fire({
      title: 'Has seleccionado la suscripción ' + subscriptionName,
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
            // Redirigir al usuario a la página de inicio de sesión
            this.router.navigate(['/conversor']);
          } else {
            // Mostrar un mensaje de error en caso de fallo
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