const crypto = require('crypto-js');

class GameSession {
    constructor(host) {
        this.host = host;
        this.active = false;
        this.disconnectTimeout = 60 * 1000;
        this._id = crypto.SHA256(Date.now() + this.host.sid).toString();
        this.players = [];

        this.connectPlayer(host);
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

    disconnectPlayer(player) {
        player.inGame = false;
        player.disconnectTimeout = setTimeout(() => {
            this.players.splice(this.players.indexOf(player), 1);
        }, this.disconnectTimeout);
    }

    start() {
        this.active = true;
    }
}

module.exports = GameSession;
