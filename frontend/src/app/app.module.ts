import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ImportModule} from './import.module';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import 'hammerjs';
import {MenuComponent} from './components/menu/menu.component';
import {HttpService} from './services/http.service';
import {ToastrService} from './services/toastr.service';
import {ToastOptions} from 'ng2-toastr';
import {ToastrConfig} from './config/toastr.config';
import {IndexFormComponent} from './components/homepage/index-form/index-form.component';
import {GameService} from './services/game.service';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        MenuComponent,
        IndexFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ImportModule,
    ],
    providers: [
        HttpService,
        ToastrService,
        {
            provide: ToastOptions,
            useClass: ToastrConfig
        },
        GameService
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
