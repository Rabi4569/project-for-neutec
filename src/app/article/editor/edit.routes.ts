import { Routes } from '@angular/router';
import { ArticleEditorComponent } from './editor.component';

export const editRoutes: Routes = [
    { path: 'new', component: ArticleEditorComponent },
    { path: ':id', component: ArticleEditorComponent }
];