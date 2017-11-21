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
            'getGamesList',
            'getGameDetails'
        ];

        listeners.forEach(method => {
            socketService.AddSocketListener(player.socket, method, (...params) => {
                const result = this[method].apply(this, [player].concat(params));
                console.log(result);
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

    static joinGameObj(player, game) {
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
        const activeGames = this.games.map(game => {
            return this.normalizeGame(game);
        });
        return activeGames.filter(game => {
            return !game.active;
        });
    }

    static normalizeGame(game) {
        return {
            _id: game._id,
            name: game.name,
            players: game.players.map(player => {
                return {
                    sid: player.sid
                }
            }),
            host: {
                sid: game.host.sid
            }
        };
    }

    destroyGame(game) {
        this.games.splice(this.games.indexOf(game), 1);
    }

    getGameDetails(player, id) {
        let game = this.findGame(id);
        if (game) {
            game = this.normalizeGame(game);
        }
        return game;
    }
}

module.exports = new GameService();
