import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';
import { Router } from '@angular/router';
import { LocalStorageService } from '../core/Service/LocalStorageService';

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
        MatFormFieldModule
    ],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class LogginComponent {

    loginForm: FormGroup;
    passworedType = signal("password")

    constructor(private fb: FormBuilder, private router: Router ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login():boolean {

        if(!this.loginForm.valid){
            console.log('表單不完整');
            return false;
        }

        if(!this.verifyUser){
            console.log('使用者帳號或密碼錯誤');
            return false;
        } 

        console.log("test");

        this.router.navigate(['/article']);

        return true;
    }

    verifyUser () {

        return true;

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