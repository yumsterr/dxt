import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-game-lobby',
    templateUrl: './game-lobby.component.html',
    styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {

    public _id: string;
    public game: any;

    constructor(public gameService: GameService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        console.log(this.route);
        this.route.params.subscribe(async params => {
            this._id = params['game_id'];
            this.game = await this.gameService.getGame(this._id);
            console.log(this.game);
        });
    }

    join() {

    }

    leave() {

    }

}
