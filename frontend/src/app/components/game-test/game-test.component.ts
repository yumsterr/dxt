import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
    selector: 'app-game-test',
    templateUrl: './game-test.component.html',
    styleUrls: ['./game-test.component.scss']
})
export class GameTestComponent implements OnInit {

    constructor(public game: GameService) {
    }

    ngOnInit() {
    }

    joinGame(gameId) {
        this.game.joinGame(gameId);
    }

    createGame() {
        this.game.createGame('123');
    }
}
