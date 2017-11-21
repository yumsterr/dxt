import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './components/homepage/homepage.component';
import {GameTestComponent} from './components/game-test/game-test.component';
import {FindGamePageComponent} from './components/find-game-page/find-game-page.component';
import {GameLobbyComponent} from './components/game-lobby/game-lobby.component';


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
        path: 'find_game/:game_id',
        pathMatch: 'full',
        component: FindGamePageComponent,
        children: [
            {
                path: '',
                component: GameLobbyComponent
            }
        ]
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
