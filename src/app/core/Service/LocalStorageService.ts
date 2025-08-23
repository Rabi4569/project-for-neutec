import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' 
})

export class LocalStorageService {

    static setItem (itmeKey:string, itemContent:{}):boolean {

        const saveString = JSON.stringify(itemContent);

        localStorage.setItem(itmeKey, saveString);

        return true;
    }

    static getItem(itemKey:string) {

        return JSON.parse(localStorage.getItem(itemKey) || "{}")

    }

    static deleteItem(itemKey:string):boolean {

        localStorage.removeItem(itemKey);

        return true;

    }

}