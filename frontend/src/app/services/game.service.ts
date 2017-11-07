import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';

@Injectable()
export class GameService {

    constructor(public socketService: SocketService) {
    }

    findGame() {
        this.socketService.send('find_game');
    }

}
