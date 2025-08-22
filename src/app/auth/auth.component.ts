import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';

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


}