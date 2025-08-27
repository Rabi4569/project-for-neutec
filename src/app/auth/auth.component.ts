import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../core/Service/AuthService';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { AlertService } from '../core/Service/AlertService';

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
        MatProgressSpinnerModule
    ],
    providers:[
        AuthService,
        AlertService
    ],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class LogginComponent {

    loginForm: FormGroup;
    passworedType = signal("password")
    loading = signal<boolean>(false)

    constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private authService:AuthService,
        private alertService:AlertService,
    ) {
        this.loginForm = this.fb.group({
            username: ['admin_user', [Validators.required, this.usernameValidator]],
            password: ['admin_password', Validators.required]
        });

        effect(() => {

            if(this.loading()){
                this.loginForm.disable();
            }else{
                this.loginForm.enable();
            }

        })
    }

    usernameValidator(control: any) {
        const value = control.value;
        if (!value) return null;
    
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return { invalidUsername: true };
        }
        return null;
      }
    

    async login(): Promise<void> {
        if (!this.loginForm.valid) {
            this.alertService.showWarning('username/password error or empty');
            return;
        }
  
        this.loading.set(true);
  
        try {
            const success = await this.verifyUser();
            if (success) {
                this.router.navigate(['/article']);
            } else {
                this.alertService.showError('User not found or password Incorrect.');
            }
        } catch (error) {
            this.alertService.showError('Login failed.');
            console.error('Login error:', error);
        } finally {
            this.loading.set(false);
        }
    }
  

    private verifyUser(): Promise<boolean> {

        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
  
        return new Promise((resolve, reject) => {
            AuthService.login(username, password).subscribe({
                next: (res) => resolve(res.status === 200),
                error: (error) => reject(error)
            });
        });
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