import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component ({
    selector: 'app-search',
    standalone: true,
    imports:[
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
    ],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent {

    searchTerm = '';
    searchSubject = new Subject<string>();

    searching = output<string>()

    constructor() {
        
        this.searchSubject.pipe(
            debounceTime(500) 
        ).subscribe(searchTerm => {
            this.searching.emit(searchTerm);
        });
    }

    onInput (value:string) {
        this.searchSubject.next(value); // 發送值
    }
 }