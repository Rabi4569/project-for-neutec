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
        children:[
            {
                path: '',
                loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent)
            },
            {
                path: 'edit',
                loadChildren: () => import('./article/editor/edit.routes').then(m => m.editRoutes)
            }
        ],
        // loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
        canActivate: [AuthGuard]
    },
    {
        path:"**",
        redirectTo:"/auth"
    }
];
