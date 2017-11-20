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
            'createGame',
            'getGamesList'
        ];

        listeners.forEach(method => {
            socketService.AddSocketListener(player.socket, method, (...params) => {
                const result = this[method].apply(this, [player].concat(params));
                socketService.EmitTo(player.socket, method + ':success', result);
            })
        });
        socketService.AddSocketListener(player.socket, 'disconnecting', () => {
            if (player.inGame && player.game) {
                player.game.initDisconnectPlayer(player);
            }
        })
    }

    createGame(player, name) {
        const session = new GameSession(player, name);
        session.on('destroy', () => {
            this.destroyGame(session);
        });
        this.games.push(session);
        this.joinGameObj(player, session);
    }

    joinGameObj(player, game) {
        if (player.game) {
            player.game.disconnectPlayer(player);
        }
        game.connectPlayer(player);
    }

    joinGame(player, gameId) {
        const game = this.findGame(gameId);
        if (game) {
            this.joinGameObj(player, game);
        }
    }

    findGame(gameId) {
        const game = this.games.filter(session => {
            return session._id === gameId;
        });
        return game.shift();
    }

    getGamesList() {
        return this.normalizeGames(
            this.games.filter(game => {
                return !game.active;
            })
        )
    }

    normalizeGames(games) {
        return games.map(game => {
            return {
                _id: game._id,
                name: game.name,
                players: game.players.map(player => {
                    return {
                        _sid: player.sid
                    }
                }),
                host: {
                    sid: game.host.sid
                }
            };
        })
    }

    destroyGame(game) {
        this.games.splice(this.games.indexOf(game), 1);
    }
}

module.exports = new GameService();
