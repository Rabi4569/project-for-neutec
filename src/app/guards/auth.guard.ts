import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../core/Service/AuthService";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor( private router: Router) {}

    canActivate():boolean{

        if(AuthService.checkLoggin()) return true;

        alert('Login Error.')
        
        this.router.navigate(['/auth']);

        return false;
        
    }
}