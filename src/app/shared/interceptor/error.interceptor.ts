import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        tap(response => {
            if (response instanceof HttpResponse && (response.body as any)?.status === 401) {
                router.navigate(['/auth']);
                alert('error');
            }
        })
    );
};