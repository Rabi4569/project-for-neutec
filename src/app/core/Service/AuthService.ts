import { CookieService } from "./CookieService"
import { ApiService } from "./ApiService";

export class AuthService {

    static login (username:string, password:string) {

        let status = 200;

        if(username !== "admin@mail.com") status = 401;
        if(password !== "admin_password") status = 401; 

        CookieService.setCookie('token', 'test-token', 7)

        return ApiService.useApi(null, "success", status)

    }

    static logout () {

       CookieService.deleteCookie('token')
       
       return ApiService.useApi(null, "success")

    }

    static checkLoggin ():boolean{

        const token = CookieService.getCookie('token')

        return token !== null && token === "test-token"
    }

}