import { state } from "@angular/animations";
import { CanActivateFn, Route, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { inject } from "@angular/core";

export const usuarioLogueadoGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    if(!auth.token()){
        const router = inject(Router);
        router.navigate(['login']);
        return false;
    }
    return true;
}