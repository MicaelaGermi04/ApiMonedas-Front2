import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Currency } from 'src/app/Interfaces/currency';
import { CurrencyService } from 'src/app/Services/currency.service';
import { AuthService } from 'src/app/Services/auth.service';
import { generarMensajeError, generarMensajeExito } from 'src/app/Helpers/messages';

@Component({
  selector: 'app-new-currency',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './new-currency.component.html',
  styleUrls: ['./new-currency.component.scss']
})
export class NewCurrencyComponent {
  currencyService= inject(CurrencyService);
  auth = inject(AuthService);

  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() currency: Currency ={
    id:0,
    name: '',
    symbol: '',
    value: 0,
  };

  async onSubmit(){
    if(this.currency.id){
      this.editCurrency();
    }else{
      this.createCurrency();
    }
  };

  async createCurrency(){
   const userRole= await this.auth.getRole();
   if (userRole === 'Admin'){
    const res = await this.currencyService.createCurrency(this.currency);
    if(res){
      generarMensajeExito('La moneda ha sido creada con exito');
    }else{
      generarMensajeError('Error creando moneda');
    }
   }else{
    generarMensajeError('No tiene autorizacion para crear monedas');
   }
  }

  async editCurrency(){
    const userRole = await this.auth.getRole();
    if(userRole === 'Admin'){
      const res = await this.currencyService.editCurrency(this.currency);
      if(res){
        generarMensajeExito('La moneda ha sido editada correctamente');
      }else{
        generarMensajeError('Error editando la moneda');
      }
    }else{
      generarMensajeError('No esta autorizado para editar monedas');
    }
  }

  async deleteCurrency(){
    const userRole = await this.auth.getRole();
    if(userRole === 'Admin'){
      const res = await this.currencyService.deleteCurrency(this.currency.id);
      if(res){
        generarMensajeExito('Moneda eliminada');
        this.refresh.emit();
        this.getCurrencies();
      }else{
        generarMensajeError('Error eliminando la moneda');
      }
    }else{
      generarMensajeError('No esta autorizado para eliminar monedas')
    }
  }

  async getCurrencies(){
    const res= await this.currencyService.getAll();
    if(res){
      this.refresh.emit();
    }
  }
}
