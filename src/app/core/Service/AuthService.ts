import { CookieService } from "./CookieService"

/**
 * 此部分僅提供登入模擬 token正式上線請改用後端派發的http only 
 * 並改為加密密碼
 */

export class AuthService {

    static login (username:string, password:string) {

        if(username !== "admin_user") return false;
        if(password !== "admin_password") return false; 

        CookieService.setCookie('token', 'test-token', 7)

        return {
            status:200,
            message:"success"
        }

    }

    static logout () {

       CookieService.deleteCookie('token')

    }

}