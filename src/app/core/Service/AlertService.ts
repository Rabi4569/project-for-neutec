import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' 
})

export class AlertService {

    constructor(private snackBar: MatSnackBar) {}


    showAlert (message: string) {
        this.snackBar.open(message, '關閉', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }

    showError (message: string):void {
        this.snackBar.open(message, '關閉', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error']
        });
    }

    showSuccess (message:string) {
        this.snackBar.open(message, '關閉', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success']
        });
    }

    showWarning(message:string){
        this.snackBar.open(message, '關閉', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['warning']
        });
    }

}