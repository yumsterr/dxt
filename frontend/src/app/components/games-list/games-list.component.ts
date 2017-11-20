import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnChanges {

    @Input() games: any;

    constructor() {
    }

    ngOnInit() {
        console.log(this.games);
    }

    ngOnChanges() {
        console.log(this.games);
    }
}
