import { Component, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../shared/layout/default/default.component';
import { DataTableComponent } from '../shared/component/DataTable/dataTable.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArticleService } from '../core/Service/ArticleService';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataDialogComponent } from '../shared/component/DataDialog/dataDialog.component';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule}  from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';


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
        DataDialogComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatCheckboxModule
    ],
    providers: [
        ArticleService,
        provideNativeDateAdapter(),
    ],
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit{

    articleForm: FormGroup;
    data     = signal<any[]>([]);
    loading  = signal(true);
    tagReady = signal(false);
    editForm = signal<boolean>(false);
    tagData  = signal<any[]>([])

    constructor(
        private articleService:ArticleService,
        private fb: FormBuilder, 
    )
    {
        this.articleForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            author: [''],
            tag: this.fb.array([]),
            date:[new Date()]
        });

        this.tagData.set(this.articleService.getArticleTag())
    }

    get tagsFormArray(): FormArray {
        return this.articleForm.get('tag') as FormArray;
    }

    createNewArticle () {

        const selectedTags = this.tagsFormArray.value
            .map((checked: boolean, i: number) => (checked ? this.tagData()[i].value : null))
            .filter((v: number | null): v is number => v !== null);

        this.articleForm.value.tag = selectedTags;
        
        const response =  this.articleService.addNewArticle(this.articleForm.value);

        if(response.status === 200){

            this.editForm.set(false)
            this.getArticleList();
        }// console.log(response);
       
    }

    openEditor () {
        this.editForm.set(true)
    }

    edit(row: any) {
        console.log('編輯:', row);
        // 你的編輯邏輯
    }

    confirmEdit(){
        if (this.articleForm.valid) {

            this.createNewArticle()
            
        } else {
            console.log('表單無效');
            this.articleForm.markAllAsTouched(); 
        }
    }

    cancelEdit(){
        this.editForm.set(false)
    }

    delete(row: any) {
        console.log('刪除:', row);
        // 你的刪除邏輯
    }

    getArticleList () {

        this.loading.set(true);

        this.articleService.getAllArticles().subscribe({
            next: (res) => {

                if(res.status === 200){
                    this.data.set(res.data.list);
                    this.tagData.set(res.data.tag)

                    const tagControls = this.tagData().map(() => this.fb.control(false));
                    this.articleForm.setControl('tag', this.fb.array(tagControls));

                    this.tagReady.set(true)
                }

                this.loading.set(false);
            }
        });
    }

    ngOnInit() {  
        this.getArticleList();
    }
}