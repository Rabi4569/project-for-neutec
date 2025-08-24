export class CookieService {

    static setCookie(key: string, value: string, days: number = 7, path: string = '/'): void {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${key}=${value}${expires}; path=${path}`;
    }

    static getCookie(key: string): string | null {
        const name = key + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length);
            }
        }
        return null;
    }

    static updateCookie(key: string, value: string, days: number = 7, path: string = '/'): void {
        this.setCookie(key, value, days, path);
    }

    static deleteCookie(key: string, path: string = '/'): void {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    }

}