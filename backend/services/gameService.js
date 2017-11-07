const socketService = require('./socketService');

class GameService {
    constructor() {
        this.activeGames = [];
        this.users = [];

        socketService.AddConnectHandler(this.initPlayerListeners.bind(this));
    }

    initPlayerListeners(player) {
        socketService.AddSocketListener(player.socket, 'find_game', (data) => {
            this.findGame(data);
        });
    }

    findGame(q) {
        console.log(q);
    }
}

module.exports = new GameService();
