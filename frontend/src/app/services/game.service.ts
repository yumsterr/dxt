import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GameService {

    public games = new Subject<any>();

    constructor(public socketService: SocketService) {
        this.initListeners();
    }

    initListeners() {
        this.socketService.addListener('joinGame:success', data => {
            console.log(data);
        });
        this.socketService.addListener('createGame:success', data => {
            this.getGames();
        });
        this.socketService.addListener('getGamesList:success', data => {
            this.games.next(data);
        });
    }

    joinGame(gameId) {
        this.socketService.send('joinGame', gameId);
    }

    createGame(name: string) {
        this.socketService.send('createGame', name);
    }

    getGames() {
        this.socketService.send('getGamesList');
    }
}
