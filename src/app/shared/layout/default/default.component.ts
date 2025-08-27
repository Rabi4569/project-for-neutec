import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SystemMenuService } from '../../../core/Service/SystemMenuService';


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
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})

export class DefaultLayoutComponent{

    systemMenu:systemMenuItem[] = [];

    constructor(private systemMenuService:SystemMenuService ){
        this.systemMenu = SystemMenuService.getSystemMenu();
    }

}