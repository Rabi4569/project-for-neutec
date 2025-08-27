import {of, delay } from 'rxjs';

export class ApiService {

    static useApi(data:any, status:number | null = null){
        return of({
            status:status ? status : 200,
            data:data
        }).pipe(
            delay(1500) 
        );
    }

}