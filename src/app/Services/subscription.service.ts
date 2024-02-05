import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Subscription } from "../Interfaces/subscription";
import { API } from "../Constants/api";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService extends ApiService{

    async getAll(): Promise<Subscription[]> {
        const res = await fetch(API + 'Subscription', {
          headers: {
            Authorization: 'Bearer ' + this.authService.token(),
          },
        });
        const data = await res.json();
        return data;
      }
    

    async getSubscriptionById(id: number | string): Promise<Subscription | undefined> {
        try {
            const res = await fetch(API + 'Subscription/' + id, {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.authService.token(),
              },
            });
            if (!res.ok) {
              throw new Error('Error fetching subscription');
            }
            return await res.json();
          } catch (error) {
            console.error(error);
            return undefined;
          }
    }

    async getSubscriptionAmountConversions(id: number | string): Promise<number | undefined>{
        try {
            const res = await fetch(API + 'Subscription/' + id + '/AmountOfConversions', {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.authService.token(),
              },
            });
            if (!res.ok) {
              throw new Error('Error fetching subscription');
            }
            return await res.json();
          } catch (error) {
            console.error(error);
            return undefined;
          }
        }
}