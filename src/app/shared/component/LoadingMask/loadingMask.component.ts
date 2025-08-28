import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { useUserStore } from '../../../core/Store/UserStoreService';


@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './loadingMask.component.html',
    styleUrls: ['./loadingMask.component.scss']
})

export class LoadingMaskComponent  {


    constructor( public userStore:useUserStore){
    }

}