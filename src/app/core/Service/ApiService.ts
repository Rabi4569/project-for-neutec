import {of, delay, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './AuthService';

export class ApiService {

    static useApi(data:any, message:string='empty', status:number | null = null){

        const returnStatus = AuthService.checkLoggin() ? (status ? status : 200) : 401

        return of({
            status:returnStatus,
            data:data,
            message:message
        }).pipe(
            delay(1500) 
        );
    }

}