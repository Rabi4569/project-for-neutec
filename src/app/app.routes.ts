import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/auth',
        pathMatch:'full'
    },
    {
        path:'auth',
        loadComponent: () => import('./auth/auth.component').then(m => m.LogginComponent)
    },
    {
        path: 'article',
        loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent)
    },
    {
        path:"**",
        redirectTo:"/auth"
    }
];
