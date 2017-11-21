import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateGameDialogComponent} from './create-game-dialog/create-game-dialog.component';
import {GameService} from '../../services/game.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-find-game-page',
    templateUrl: './find-game-page.component.html',
    styleUrls: ['./find-game-page.component.scss']
})
export class FindGamePageComponent implements OnInit {

    public activeGames = [];
    public detailGameId: string;
    private parentUrl = '/find_game/';

    constructor(public dialog: MatDialog,
                public gameService: GameService,
                private route: ActivatedRoute,
                private router: Router) {
        this.gameService.getGames();
    }

    ngOnInit() {
        this.gameService.games.subscribe(games => {
            this.activeGames = games;
            this.checkGames();
        });
        this.route.params.subscribe(params => {
            this.detailGameId = params['game_id'];
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

    checkGames() {
        if (!this.detailGameId) {
            return;
        }

        let gameFound = false;

        this.activeGames.forEach(game => {
            if (game._id === this.detailGameId) {
                gameFound = true;
            }
        });

        if (!gameFound) {
            this.router.navigate([this.parentUrl]);
        }
    }

}
