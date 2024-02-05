import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { API } from "../Constants/api";

@Injectable({
    providedIn: 'root'
})
export class ApiService{
    authService= inject(AuthService);
     constructor() {}

    async getAuth(endpoint:string){
        const res = await fetch(API+endpoint,{
            headers:{
                Authorization: "Bearer "+this.authService.token()
            }
        });
        if(res.status === 401){
            this.authService.logOut();
        }
        return res;
    }
}