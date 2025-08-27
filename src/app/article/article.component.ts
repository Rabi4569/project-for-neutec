import { Component, signal, OnInit, ViewChild, computed } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../core/Service/AlertService';
import { SearchComponent } from './search/search.component';

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
        SearchComponent
    ],
    providers: [
        ArticleService,
        provideNativeDateAdapter(),
        AlertService
    ],
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit{

    @ViewChild(DataTableComponent) tabler!: DataTableComponent;

    data      = signal<any[]>([]);
    loading   = signal(true);
    savingLoading = signal<boolean>(false)
    tagReady  = signal(false);
    tagData   = signal<any[]>([])
    editForm  = signal<boolean>(false);
    keyword   = signal<string>("")

    selectedArticle = signal<Article | null>(null);
    selectedIds = signal<number[]>([]);
    deleteButton = computed(() => this.selectedIds().length > 0);

    currentPage = signal<number>(0);
    totalItems = signal<number>(0);

    constructor( 
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService
    ){}

    openEditor () {
        this.selectedArticle.set(null);
        this.editForm.set(true)
    }

    edit(row: any) {
        this.selectedArticle.set(row); 
        this.editForm.set(true)      
    }

    deleteSelected() {
        if(window.confirm("Confirm Delete Selected?")){
            this.articleService.deleteArticle(this.selectedIds()).subscribe({
                next: (res) => {
                    if(res.status === 200){
                        this.alertService.showSuccess(res.message)                        
                    }
                },
                error: (error) => {
                    console.error('Loading failed:', error);
                },
                complete:() => {
                    this.getArticleList();
                }
            })
        }
    }

    getArticleList () {

        this.loading.set(true);

        // 準備分頁參數
        const params = {
            page: this.currentPage(),
        };

        this.articleService.getAllArticles(params, this.keyword()).subscribe({
            next: (res) => {
                if(res.status === 200){

                    this.data.set(res.data.list);
                    this.tagData.set(res.data.tag);
                    this.totalItems.set(res.data.total || 0);
                    this.selectedIds.set([]);
                    
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

    onSelectionChange(selectedIds: number[]){
        this.selectedIds.set(selectedIds);
    }

    getTagContent (tagData:number[]) {

        const tagMap = this.tagData();

        return tagData.map(tag => tagMap.find(mapitem => mapitem.value === tag).name)
    }

    onSave(updatedArticle: any) {

        this.savingLoading.set(true);

        this.articleService.saveArticle(updatedArticle)
        .subscribe({
            next:(response) => {
                if(response.status === 200) {
                    this.editForm.set(false);
                    this.getArticleList();
                    this.alertService.showSuccess(response.message)
                }

            },
            error: (error) => {
                console.error('Save failed:', error);
            },
            complete:() => {
                this.savingLoading.set(false);
            }
        });
        
    }

    searchKeyword (keyword:string) {
        this.keyword.set(keyword);
        this.getArticleList();
    }
  
    onCancel() {
        this.editForm.set(false);
        this.selectedArticle.set(null);
    }

    onPageChange(event: any) {
        this.currentPage.set(event.pageIndex);
        console.log(event.pageIndex)
        this.updateUrl();
        this.getArticleList();
    }

    private updateUrl() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: this.currentPage(),
            },
            queryParamsHandling: 'merge'
        });
    }

    private initFromQuery() {
        const page = this.route.snapshot.queryParams['page'];
        
        if (page) this.currentPage.set(+page);
    }

    ngOnInit() {  
        this.initFromQuery();
        this.getArticleList();
        
        // 監聽 query 參數變化
        this.route.queryParams.subscribe(params => {
            const page = params['page'];
            
            if (page && +page !== this.currentPage()) {
                this.currentPage.set(+page);
                this.getArticleList();
            }
            
        });
    }
}