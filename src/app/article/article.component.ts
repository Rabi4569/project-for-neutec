import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../shared/layout/default/default.component';

@Component ({
    selector: 'app-article',
    standalone: true,
    imports: [
        CommonModule,
        DefaultLayoutComponent
    ],
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})

export class ArticleComponent {
    showFiller = false;
}