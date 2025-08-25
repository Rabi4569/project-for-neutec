import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
        loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
        canActivate: [AuthGuard]
    },
    {
        path:"**",
        redirectTo:"/auth"
    }
];
