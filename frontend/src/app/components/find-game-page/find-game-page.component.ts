import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {MatDialog} from '@angular/material';
import {CreateGameDialogComponent} from './create-game-dialog/create-game-dialog.component';
import {GameService} from '../../services/game.service';

@Component({
    selector: 'app-find-game-page',
    templateUrl: './find-game-page.component.html',
    styleUrls: ['./find-game-page.component.scss']
})
export class FindGamePageComponent implements OnInit {

    public activeGames = [];

    constructor(public dialog: MatDialog,
                public gameService: GameService) {
        this.gameService.getGames();
    }

    ngOnInit() {
        this.gameService.games.subscribe(games => {
            this.activeGames = games;
        });
    }

    createGame() {
        const dialog = this.dialog.open(
            CreateGameDialogComponent,
            {
                data: {
                    userName: 'test'
                }
            }
        );
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.gameService.createGame(result);
            }
        });
    }

    refresh() {
        this.gameService.getGames();
    }

}
