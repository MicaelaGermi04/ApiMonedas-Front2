import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Conversion } from "../Interfaces/conversion";
import { API } from "../Constants/api";

@Injectable({
    providedIn: 'root'
})
export class ConversionService {
    authService= inject(AuthService);

    async getAllConversions(){
        const res = await fetch(API + 'Conversion', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.authService.token(),
            },
          });
          return await res.json();
    }

    async PerformConversion(conversion: Conversion){
        const res = await fetch(API + 'Conversion/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.token(),
            },
            body: JSON.stringify(conversion),
        });
        console.log("Conversion: ", res);
        if (res) return await res.json();
    }

    async getAmountOfConversions(){
        const res= await fetch(API + 'Conversion/AmountConversions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.token(),
            },
        });
        const data = await res.json();
        return data;
    }
}