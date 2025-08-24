import { Component, input, TemplateRef, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-data-table',
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
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

    showSelection = input<boolean>(false)
    selection     = new SelectionModel<any>(true, []);

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

}