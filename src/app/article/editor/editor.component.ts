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

interface Article {
    id:number,
    title:string,
    content:string,
    author:string,
    date:string,
    tag:number[]
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
        MatFormFieldModule
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

    article = input<Article | null>(null)
    tagData = signal<any[]>([])

    open = input<boolean>(false)

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
            tag: this.formBuilder.array(
                tagData.map(() => new FormControl(false))
            ),
        });

        effect(() => {
            this.patchArticleToForm();  
        })
       
    }

    get tagsFormArray(): FormArray {
        return this.articleForm.get('tag') as FormArray;
    }

    private patchArticleToForm() {

        const thisArticle = this.article()

        // set form
        this.articleForm.patchValue({
            title: thisArticle?.title ?? '',
            content: thisArticle?.content ?? '',
            author: thisArticle?.author ?? '',
            date: thisArticle?.date ?? new Date().toISOString()
        });

        // set tag
        const tagFormArray = this.tagsFormArray;
        this.tagData().forEach((tagItem, index) => {
            const isSelected = thisArticle?.tag.includes(tagItem.value);
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
