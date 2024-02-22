import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "../Interfaces/user";
import { API } from "../Constants/api";

@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService{
    
    async getAll(): Promise<User[]>{
        const res = await fetch(API + 'User', {
            headers: {
                Authorization: 'Bearer ' + this.authService.token(),
            },
        });
        const data= await res.json();
        return data;
    }

    async getUserById(id:number): Promise<User>{
        const res = await fetch(API + 'User/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',   
                Authorization: 'Bearer ' + this.authService.token(), 
            },
        });
        return await res.json();
    }

    async createUser(user: User): Promise<boolean> {
        const res = await fetch(API + 'User', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.token(),
          },
          body: JSON.stringify(user), 
        });
        return res.ok; 
    }

    async editUser(user: User): Promise<boolean>{
        if(!user.id) return false;
        const res = await fetch(API + 'User/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                Authotization: 'Bearer ' + this.authService.token(),
            },
            body: JSON.stringify(user),
        });
        return res.ok;
    }

    async deleteUser(id:number): Promise<boolean>{
        const res = await fetch(API + 'User/' + id,{
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.authService.token(),
            },
        });
        return res.ok;
    }

    async editUserSubscription(userId:number, subscriptionId:number): Promise<boolean>{
        const res= await fetch(API + 'User/'+ userId,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.authService.token(),
            },
            body: JSON.stringify(subscriptionId)
        });
        return res.ok;
    }
    
}