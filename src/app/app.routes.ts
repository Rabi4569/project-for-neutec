import { Routes } from '@angular/router';
import { LogginComponent } from './auth/auth.component';
import { ArticleComponent } from './article/article.component'

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/auth',
        pathMatch:'full'
    },
    {
        path:'auth',
        component:LogginComponent
    },
    {
        path:'article',
        component:ArticleComponent
    },
    {
        path:"**",
        redirectTo:"/auth"
    }
];
