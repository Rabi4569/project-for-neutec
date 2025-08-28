import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'publishStatus'
})
export class PublishStatusPipe implements PipeTransform {
    transform(status: boolean): string {

        return status ? 'Published' : 'Draft';

    }
}
