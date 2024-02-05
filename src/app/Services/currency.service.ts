import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Currency } from "../Interfaces/currency";
import { API } from "../Constants/api";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService{
    authService= inject(AuthService);

    async getAll(): Promise<Currency[]>{
        const res= await fetch(API + 'Currency', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.authService.token(),
            },
        });
       
        return await res.json();
    }

    async getCurrencyById(id:number | string): Promise<Currency | undefined>{
        const res = await fetch(API + 'Currency/' + id, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                Authorization: 'Bearer ' + this.authService.token(),
            },
        });
        if(!res.ok){
            throw new Error("Error buscando subscripcion");
        }
        return await res.json();
    }

    async createCurrency(currency: Currency): Promise<boolean>{
        if(!currency.id) return false;

        const res = await fetch(API + 'Currency/' + currency.id, {
            method:'PUT',
            headers: {
                'Content-type' : 'application/json',  //'Content-Type' se establece en 'application/json' para indicar que el cuerpo de la solicitud es un objeto JSON
                Authorization: 'Bearer ' + this.authService.token(),
            },
            body: JSON.stringify(currency),
        });
        return res.ok;
    }

    async editCurrency(currency: Currency): Promise<boolean> {
        if (!currency.id) return false;
        const res = await fetch(API + 'Currency/' + currency.id, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.authService.token(),
          },
          body: JSON.stringify(currency),
        });
        return res.ok;
      }

    async deleteCurrency(currencyId: number | string) : Promise<boolean>{
        const res = await fetch(API + 'Currency/' + currencyId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.authService.token(),
            },
        });
        return res.ok;
    }

}