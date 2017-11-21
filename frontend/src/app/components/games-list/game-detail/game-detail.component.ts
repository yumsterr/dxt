import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-game-list-detail',
    templateUrl: './game-detail.component.html',
    styleUrls: ['./game-detail.component.scss']
})
export class GameListDetailComponent implements OnInit {

    private parentUrl = '/find_game/';

    @Input() game: any = {};

    constructor() {
    }

    ngOnInit() {
    }

}
