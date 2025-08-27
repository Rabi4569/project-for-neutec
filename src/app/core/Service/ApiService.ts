import {of, delay } from 'rxjs';

export class ApiService {

    static useApi(data:any, message:string='empty', status:number | null = null){
        return of({
            status:status ? status : 200,
            data:data,
            message:message
        }).pipe(
            delay(1500) 
        );
    }

}