import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../core/Service/AuthService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-auth-login',
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        MatCardModule,
        MatCardModule, 
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
    ],
    providers:[
        AuthService,
        MatSnackBar
    ],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class LogginComponent {

    loginForm: FormGroup;
    passworedType = signal("password")

    constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private authService:AuthService,
        private snackBar: MatSnackBar
    ) {
        this.loginForm = this.fb.group({
            username: ['admin_user', Validators.required],
            password: ['admin_password', Validators.required]
        });
    }

    login():boolean {

        if(!this.loginForm.valid){
            this.snackBar.open('帳號密碼為必填', '關閉', {
                duration: 3000,
                horizontalPosition: 'center', 
                verticalPosition: 'top'
            });
            return false;
        }


        if(!this.verifyUser()){
            this.snackBar.open('帳號或密碼錯誤', '關閉', {
                duration: 3000,
                horizontalPosition: 'center', 
                verticalPosition: 'top'
            });
            return false;
        } 

        this.router.navigate(['/article']);

        return true;
    }

    verifyUser () {

        return AuthService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
    }

    togglePasswordType(){

        const nowType = this.passworedType()

        if(nowType === "text"){

            this.passworedType.set("password")

        }else{

            this.passworedType.set("text")

        }
    }
}