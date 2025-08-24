import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' 
})

export class SystemMenuService {

    static getSystemMenu () {
        return [
            {
                caption:'Dashboard',
                icon:"dashboard",
                link:"/dashboard"
            },
            {
                caption:'Article',
                icon:"article",
                link:"/article"
            }
        ]
    }

}