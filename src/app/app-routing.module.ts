import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usuarioSinLoguear } from './Guards/usuario-sin-loguear.guard';
import { usuarioLogueadoGuard } from './Guards/usuario-logueado.guard';
import { adminGuard } from './Guards/admin.guard';

const routes: Routes = [{
  path:"login",
  canActivate: [usuarioSinLoguear],
  loadChildren: ()=> import('./Public/login/login.module').then(m=> m.LoginModule)
},
{
  path:"register",
  canActivate: [usuarioSinLoguear],
  loadChildren: ()=> import('./Public/register/register.module').then(m => m.RegisterModule)
},
{
  path:"subscription",
  canActivate: [usuarioLogueadoGuard],
  loadChildren: ()=> import('./authenticated-user-pages/subscription/subscription.module').then(m => m.SubscriptionModule)
},
{
  path:"conversor",
  canActivate: [usuarioLogueadoGuard],
  loadChildren: ()=> import('./authenticated-user-pages/conversor/conversor.module').then(m => m.ConversorModule)
},
{
  path:"perfil",
  canActivate: [usuarioLogueadoGuard],
  loadChildren: ()=> import('./authenticated-user-pages/user-menu/user-menu.module').then(m => m.UserMenuModule)
},
{
  path: "",
  redirectTo: 'conversor',
  pathMatch: "full"
},
{
  path:"admin",
  canActivate: [adminGuard],
  loadChildren: ()=> import('./Admin/admin/admin.module').then(m => m.AdminModule)
},
{
  path:"**",
  loadChildren: ()=> import('./Public/error/error.module').then(m => m.ErrorModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
