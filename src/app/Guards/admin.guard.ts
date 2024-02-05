import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";

export const adminGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const userRole= auth.getRole();
    if (userRole != 'Admin'){
        return false;
    }
    return true;
};