import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ImportModule } from './import.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import 'hammerjs';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImportModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
