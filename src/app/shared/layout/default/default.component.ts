import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-default-layout',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})

export class DefaultLayoutComponent{}