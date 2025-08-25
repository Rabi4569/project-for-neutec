import { CookieService } from "./CookieService"
import {of, delay } from 'rxjs';

export class AuthService {

    static login (username:string, password:string) {

        let status = 200;

        if(username !== "admin_user") status = 401;
        if(password !== "admin_password") status = 401; 

        CookieService.setCookie('token', 'test-token', 7)

        return of({
            status:status,
            message:"success"
        }).pipe(
            delay(1500) 
        );

    }

    static logout () {

       CookieService.deleteCookie('token')

    }

    static checkLoggin ():boolean{

        const token = CookieService.getCookie('token')

        return token !== null && token === "test-token"
    }

}