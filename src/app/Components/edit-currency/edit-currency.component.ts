import { Component, EventEmitter,Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Services/auth.service';
import { CurrencyService } from 'src/app/Services/currency.service';
import { Currency } from 'src/app/Interfaces/currency';
import { generarMensajeError, generarMensajeExito } from 'src/app/Helpers/messages';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-currency',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.scss']
})
export class EditCurrencyComponent {
    auth = inject(AuthService);
    currencyService= inject(CurrencyService);

    @Output() close = new EventEmitter();
    @Output() refresh = new EventEmitter();
    @Input() currency: Currency = {
      id: 0,
      name: '',
      isOcode: '',
      value: 0,
    };

    onSubmit(){
      if(this.currency.id) this.editCurrency();
    }

    async editCurrency(){
      const userRole = await this.auth.getRole();
      if(userRole === "Admin"){
        const res= await this.currencyService.editCurrency(this.currency);
        if(res){
          generarMensajeExito("Moneda editada correctamente");
          this.refresh.emit();
        }else{
          generarMensajeError("Error editando moneda");
        }
      }else{
        generarMensajeError("No esta autorizado para editar monedas")
      }
    }
}
