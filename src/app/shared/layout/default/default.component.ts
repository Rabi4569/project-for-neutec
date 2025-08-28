import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SystemMenuService } from '../../../core/Service/SystemMenuService';
import { AuthService } from '../../../core/Service/AuthService';
import { useUserStore } from '../../../core/Store/UserStoreService';
import { factory } from 'typescript';


interface systemMenuItem{
    caption:string,
    icon:string,
    link:string
}

@Component({
    selector: 'app-default-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule
    ],
    providers:[
        AuthService
    ],
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})

export class DefaultLayoutComponent{

    systemMenu:systemMenuItem[] = [];

    constructor(
        private systemMenuService:SystemMenuService, 
        private router:Router, 
        public userStore:useUserStore
    ){
        this.systemMenu = SystemMenuService.getSystemMenu();
    }

    logout () {
        this.userStore.setGlobalLoading(true)
        AuthService.logout().subscribe({
            next:(res) => {
                if(res.status === 200){
                    this.router.navigate(['/auth']);
                }
            },
            complete:() => {
                this.userStore.setGlobalLoading(false)
            }
        })
    }

}