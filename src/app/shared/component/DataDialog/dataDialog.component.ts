import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-data-dialog',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    standalone: true,
    templateUrl: './dataDialog.component.html',
    styleUrls: ['./dataDialog.component.scss']
})

export class DataDialogComponent {

    showActions = input<boolean>(true);
    title = input<string>('Dialog');
    open  = input<boolean>(false);

    cancelText  = input<string>('cancel');
    confirmText = input<string>('Save');
    
    cancel  = output();
    confirm = output();
    bgCancel = output();

    constructor(){}

    onCancel() {    
        this.cancel.emit();
    }

    onConfirm() {
        this.confirm.emit();
    }

    backGroundCancel () {
        this.bgCancel.emit();
    }

}