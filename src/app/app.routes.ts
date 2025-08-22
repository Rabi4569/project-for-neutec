import { Routes } from '@angular/router';
import { LogginComponent } from './auth/auth.component';

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
        path:"**",
        redirectTo:"/auth"
    }
];
