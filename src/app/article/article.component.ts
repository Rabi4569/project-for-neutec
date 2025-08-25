import { Component, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../shared/layout/default/default.component';
import { DataTableComponent } from '../shared/component/DataTable/dataTable.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArticleService } from '../core/Service/ArticleService';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ArticleEditorComponent } from './editor/editor.component';
import { MatChipsModule } from '@angular/material/chips';

interface Article {
    id:number,
    title:string,
    content:string,
    author:string,
    date:string,
    tag:number[]
}

@Component ({
    selector: 'app-article',
    standalone: true,
    imports: [
        CommonModule,
        DefaultLayoutComponent,
        DataTableComponent,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatIconModule,
        MatCheckboxModule,
        ArticleEditorComponent,
        MatChipsModule,
    ],
    providers: [
        ArticleService,
        provideNativeDateAdapter(),
    ],
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit{

    @ViewChild(DataTableComponent) tabler!: DataTableComponent;

    data      = signal<any[]>([]);
    loading   = signal(true);
    tagReady  = signal(false);
    tagData   = signal<any[]>([])
    editForm  = signal<boolean>(false);

    selectedArticle: Article | null = null;
    deleteButton = signal<boolean>(false)

    constructor( private articleService:ArticleService ){}

    openEditor (id:number = 0) {

       this.editForm.set(true)
      
    }

    edit(row: any) {
        console.log('編輯:', row);
        this.selectedArticle = row;  // 設置要編輯的文章
        this.editForm.set(true)      
    }

    delete(row: any) {
        console.log('刪除:', row);
    }

    getArticleList () {

        this.loading.set(true);

        this.articleService.getAllArticles().subscribe({
            next: (res) => {
                if(res.status === 200){

                    this.tabler.selection.clear()
                    this.data.set(res.data.list);
                    this.tagData.set(res.data.tag);
                    
                }
            },
            error: (error) => {
                console.error('Loading failed:', error);
            },
            complete:() => {
                this.loading.set(false);
            }
        });
    }

    onSelectionChange(selectedItem:any){
        if(selectedItem.length > 0){
            this.deleteButton.set(true)
        }else{
            this.deleteButton.set(false)
        }
    }

    getTagContent (tagData:number[]) {

        const tagMap = this.tagData();

        return tagData.map(tag => tagMap.find(mapitem => mapitem.value === tag).name)
    }

    onSave(updatedArticle: any) {

        const response = this.articleService.saveArticle(updatedArticle);

        if(response.status === 200) {
            this.selectedArticle = null;  
            this.editForm.set(false);
            
            this.getArticleList();
        }
        
    }
  
    onCancel() {
        this.editForm.set(false);
        this.selectedArticle = null
    }

    ngOnInit() {  
        this.getArticleList();
    }
}