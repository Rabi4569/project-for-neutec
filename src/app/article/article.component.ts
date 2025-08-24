import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../shared/layout/default/default.component';
import { DataTableComponent } from '../shared/component/DataTable/dataTable.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArticleService } from '../core/Service/ArticleService';


@Component ({
    selector: 'app-article',
    standalone: true,
    imports: [
        CommonModule,
        DefaultLayoutComponent,
        DataTableComponent,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    providers: [ArticleService],
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})

export class ArticleComponent {

    data    = signal([]);
    loading = signal(false);

    constructor(private articleService:ArticleService){

    }

    edit(row: any) {
        console.log('編輯:', row);
        // 你的編輯邏輯
    }

    delete(row: any) {
        console.log('刪除:', row);
        // 你的刪除邏輯
    }
}