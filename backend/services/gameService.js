const socketService = require('./socketService');
const GameSession = require('../game/gameSession');

class GameService {
    constructor() {
        this.games = [];
        this.users = [];

        socketService.AddConnectHandler(this.initPlayerListeners.bind(this));
    }

    initPlayerListeners(player) {
        const listeners = [
            'joinGame',
            'createGame'
        ];

        listeners.forEach(method => {
            socketService.AddSocketListener(player.socket, method, (...params) => {
                this[method].apply(this, [player].concat(params));
            })
        });
        socketService.AddSocketListener(player.socket, 'disconnecting', () => {
            if (player.inGame && player.game) {
                player.game.disconnectPlayer(player);
            }
        })
    }

    createGame(player) {
        const session = new GameSession(player);
        this.games.push(session);

        console.log(session._id);
    }

    joinGame(player, gameId) {
        console.log(gameId);
        const game = this.findGame(gameId);
        if (game) {
            game.connectPlayer(player);
        }
    }

    findGame(gameId) {
        const game = this.games.filter(session => {
            return session._id === gameId;
        });
        return game.shift();
    }
}

module.exports = new GameService();
