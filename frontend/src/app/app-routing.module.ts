import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './components/homepage/homepage.component';
import {GameTestComponent} from './components/game-test/game-test.component';
import {FindGamePageComponent} from './components/find-game-page/find-game-page.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomepageComponent,
    },
    {
        path: 'find_game',
        pathMatch: 'full',
        component: FindGamePageComponent,
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

export class AppRoutingModule {
}
