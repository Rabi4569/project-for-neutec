import { Component, input, output, TemplateRef, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
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

export class DataTableComponent implements OnInit{

    data    = input<any[]>([]);
    columns = input<string[]>([]);
    columnTemplates = input<Record<string, TemplateRef<any>>>();

    showSelection = input<boolean>(false)
    selection     = new SelectionModel<any>(true, []);
    loading       = input<boolean>(false);

    selectionChange = output<any[]>();

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

    // 全選相關方法
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.data().length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.selection.select(...this.data());
        }
    }

    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'cancel all selected' : 'select all'}`;
        }
        return `${this.selection.isSelected(row) ? 'cancel selected' : 'select'} row ${row.id}`;
    }

    ngOnInit() {  
        this.selection.changed.subscribe(() => {
            this.selectionChange.emit(this.selection.selected);
        });
    }
}