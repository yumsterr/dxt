import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ImportModule} from './import.module';

import {AppRoutingModule} from './app-routing.module';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

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
import {SocketService} from './services/socket.service';
import {GameTestComponent} from './components/game-test/game-test.component';
import {GamesListComponent} from './components/games-list/games-list.component';
import {FindGamePageComponent} from './components/find-game-page/find-game-page.component';
import {GameListDetailComponent} from './components/games-list/game-detail/game-detail.component';
import { CreateGameDialogComponent } from './components/find-game-page/create-game-dialog/create-game-dialog.component';
import { QuantityStringPipe } from './pipes/quantity-string.pipe';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        MenuComponent,
        IndexFormComponent,
        GameTestComponent,
        GamesListComponent,
        FindGamePageComponent,
        GameListDetailComponent,
        CreateGameDialogComponent,
        QuantityStringPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ImportModule,
        PerfectScrollbarModule
    ],
    entryComponents: [
        CreateGameDialogComponent
    ],
    providers: [
        HttpService,
        ToastrService,
        {
            provide: ToastOptions,
            useClass: ToastrConfig
        },
        GameService,
        SocketService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
