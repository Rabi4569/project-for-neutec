import { Component, input, output, TemplateRef, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-data-table',
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatProgressSpinnerModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: './dataTable.component.html',
    styleUrls: ['./dataTable.component.scss']
})

export class DataTableComponent {

    data    = input<any[]>([]);
    columns = input<string[]>([]);
    columnTemplates = input<Record<string, TemplateRef<any>>>();
    selectionKey = input<string>('id')

    showSelection = input<boolean>(false)
    selection     = input<number[]>([]);
    loading       = input<boolean>(false);

    selectionChange = output<number[]>();

    actionTemplate  = input<TemplateRef<any>>();

    displayedColumns = computed(() => {
        let disCol = this.columns();

        if(this.actionTemplate()){
            disCol = [...disCol, 'actions'];
        }

        if(this.showSelection()){
            disCol = ['select', ...disCol];
        }

        return disCol;
    });

    isAllSelected = computed(() => {
        const numSelected = this.selection().length;
        const numRows = this.data().length;
        return numSelected === numRows;
    }) 

    hasSelectValue = computed(() => {
        return  this.selection().length > 0;
    })

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selectionChange.emit([]);
        } else {
            const keyName = this.selectionKey();
            const selectionItems = this.data().map(item => item[keyName]);
            this.selectionChange.emit(selectionItems);
        }
    }

    toggleRow(row: any) {
        const keyName = this.selectionKey();
        const selectionValue = row[keyName];
        const currentSelection = [...this.selection()];
        const index = currentSelection.indexOf(selectionValue);
        
        if (index > -1) {
            currentSelection.splice(index, 1);
        } else {
            currentSelection.push(selectionValue);
        }
        
        this.selectionChange.emit(currentSelection);
    }

    isRowSelected(row: any): boolean {
        const keyName = this.selectionKey();
        return this.selection().includes(row[keyName]);
    }

}