const crypto = require('crypto-js');
const events = require('events');

class GameSession extends events.EventEmitter {
    constructor(host, name = 'Game') {
        super();
        this.host = host;
        this.name = name;
        this.active = false;
        this.disconnectTimeout = 60 * 1000;
        this._id = crypto.SHA256(Date.now() + this.host.sid).toString();
        this.players = [];
    }

    connectPlayer(player) {
        player.inGame = true;
        player.room = this._id;
        player.game = this;
        if (player.disconnectTimeout) {
            clearTimeout(player.disconnectTimeout);
            player.disconnectTimeout = null;
            delete player.disconnectTimeout;
        }
        if (!this.players.includes(player)) {
            this.players.push(player);
        }
    }

    initDisconnectPlayer(player) {
        player.inGame = false;
        if (this.active) {
            player.disconnectTimeout = setTimeout(() => {
                this.disconnectPlayer(player);
            }, this.disconnectTimeout);
        } else {
            this.disconnectPlayer(player);
        }
    }

    disconnectPlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
        this.checkGameEmpty();
    }

    start() {
        this.active = true;
    }

    checkGameEmpty() {
        if (!this.players.length) {
            this.emit('destroy');
        }
    }
}

module.exports = GameSession;
