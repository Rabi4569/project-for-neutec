import { Component, input, output, signal, effect} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ArticleService } from '../../core/Service/ArticleService';
import { DataDialogComponent } from "../../shared/component/DataDialog/dataDialog.component";
import { MatDatepickerModule}  from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

interface Article {
    id:number,
    title:string,
    content:string,
    author:string,
    date:string,
    tag:number[],
    published:boolean
}

@Component({
    selector: 'app-article-editor',
    standalone: true,
    imports:[
        CommonModule,
        ReactiveFormsModule,
        DataDialogComponent,
        MatDatepickerModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSlideToggleModule
    ],
    providers:[
        ArticleService,
        provideNativeDateAdapter(),
    ],
    templateUrl:'./editor.component.html',
    styleUrls:['./editor.component.scss'],
})

export class ArticleEditorComponent {

    articleForm: FormGroup;

    article = input<Article | null >(null)
    tagData = signal<any[]>([])

    open    = input<boolean>(false)
    loading = input<boolean>(false)

    save   = output()
    cancel = output()

    constructor (
        private formBuilder: FormBuilder, 
        private articleService:ArticleService) 
    {
        const tagData = this.articleService.getArticleTag();
        this.tagData.set(tagData);

        this.articleForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            author: [''],
            published:false,
            tag: this.formBuilder.array(
                tagData.map(() => new FormControl(false))
            ),
        });

        effect(() => {
            const isOpen = this.open();
            
            if (isOpen) {
                this.patchArticleToForm();
            }
        });

        effect(() => {
            if(this.loading()){
                this.articleForm.disable()
            }else{
                this.articleForm.enable()
            }
        })
       
    }

    get tagsFormArray(): FormArray {
        return this.articleForm.get('tag') as FormArray;
    }

    private patchArticleToForm() {

        const thisArticle = this.article()
        
        // reset form first to clear any existing values
        this.articleForm.reset();
        
        // set form
        this.articleForm.patchValue({
            title: thisArticle?.title ?? 'New Article Title',
            content: thisArticle?.content ?? 'New Article Content',
            published: thisArticle?.published ?? false,
            author: thisArticle?.author ?? 'none',
            date: thisArticle?.date ?? new Date().toISOString()
        });

        // set tag
        const tagFormArray = this.tagsFormArray;
        this.tagData().forEach((tagItem, index) => {
            const isSelected = thisArticle?.tag?.includes(tagItem.value) ?? false;
            tagFormArray.at(index).setValue(isSelected);
        });
        
        return true;
    }


    confirmEdit(){

        if (this.articleForm.valid) {

            const formValue = this.articleForm.value;
            
            const selectedTagIds: number[] = [];
            formValue.tag.forEach((isSelected: boolean, index: number) => {
                if (isSelected) {
                    selectedTagIds.push(this.tagData()[index].value);
                }
            });

            const updated = { 
                ...this.article(), 
                ...formValue,
                tag: selectedTagIds
            };

            this.save.emit(updated);
            
        } else {

            this.articleForm.markAllAsTouched(); 

        }
       
    }

    cancelEdit () {
        this.cancel.emit();
    }

}
