import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-create-game-dialog',
    templateUrl: './create-game-dialog.component.html',
    styleUrls: ['./create-game-dialog.component.scss']
})
export class CreateGameDialogComponent implements OnInit {

    public gameName: string;

    constructor(public dialogRef: MatDialogRef<CreateGameDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.gameName = this.data.userName + '`s game';
    }

    submit() {
        this.dialogRef.close(this.gameName);
    }

    close() {
        this.dialogRef.close();
    }

}
