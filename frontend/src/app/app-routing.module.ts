import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import {GameTestComponent} from './components/game-test/game-test.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomepageComponent,
    },
    {
        path: 'game',
        pathMatch: 'full',
        component: GameTestComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
