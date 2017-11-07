import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import {
    MatButtonModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ToastModule.forRoot()
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule
    ]
})

export class ImportModule {

}
