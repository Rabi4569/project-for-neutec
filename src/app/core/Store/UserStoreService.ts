import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
    providedIn: 'root' 
})

export class useUserStore {

    private _userName = signal<string>("");
    private _globalLoading = signal<boolean>(false);

    readonly userName = this._userName.asReadonly();
    readonly globalLoading = this._globalLoading.asReadonly();

    setGlobalLoading (value:boolean) {
        this._globalLoading.set(value);
    }

    setUserName(name: string) {
        this._userName.set(name);
    }

    clear () {
        this._userName.set("");
        this._globalLoading.set(false);
    }
}