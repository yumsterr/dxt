import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';

@Injectable()
export class GameService {

    constructor(public socketService: SocketService) {
        this.initListeners();
    }

    initListeners() {
        this.socketService.addListener('joinGame:res', data => {
            console.log(data);
        });
        this.socketService.addListener('createGame:res', data => {
            console.log(data);
        });
    }

    joinGame(gameId) {
        this.socketService.send('joinGame', gameId);
    }

    createGame() {
        this.socketService.send('createGame');
    }

}
