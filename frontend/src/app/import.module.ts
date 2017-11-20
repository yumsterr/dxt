import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import {
    MatButtonModule, MatDialogModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';
import 'hammerjs';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ToastModule.forRoot(),
        MatDialogModule,
        FormsModule
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        FormsModule
    ]
})

export class ImportModule {

}
