const cookie = require("cookie");
// const GameController = require('./gameController');

class SocketService {
    constructor () {
        this.io = global.io;
        this.users = [];
        this.onConnectHandlers = [];

        this.Init();
    }

    Init () {
        this.io.use((socket, callback) => {
            let handshake = socket.request;
            handshake.cookies = cookie.parse(handshake.headers.cookie || "");
            socket.sid = handshake.cookies['connect.sid'];
            callback(null, true);
        });


        this.io.on('connection', (socket) => {
            this.SetSocket(socket);
            this.AddUser(socket);

            socket.on('disconnecting', () => {
                // GameController.UserLogout(socket.sid);
            });

            socket.on('disconnect', () => {
                this.RemoveUser(socket);
            });
        });
    };

    SetSocket (socket) {
        this.socket = socket;
    };

    AddUser (socket) {
        const newClient = {
            sid: socket.sid,
            inGame: false,
            socket: socket
        };
        this.users.push(newClient);
        this.onConnectHandlers.forEach(callback => {
            if (typeof callback === 'function') {
                callback(newClient);
            }
        });
    };

    RemoveUser (socket) {
        this.users.splice(this.users.indexOf(socket), 1);
    };

    AddListener (event, callback) {
        if (this.socket) {
            this.socket.on(event, (data) => {
                callback(data);
            });
        }
    };

    AddSocketListener (socket, event, callback) {
        socket.on(event, (data) => {
            callback(data);
        });
    };

    Emit (event, data) {
        if (this.socket){
            this.socket.emit(event, data);
        }
    };

    Broadcast (event, data) {
        if (this.socket){
            this.socket.broadcast(event, data);
        }
    };

    BroadcastRoom (event, room, data) {
        this.io.sockets.in(room).emit(event, data);
    };

    EmitTo (socket, event, data) {
        socket.emit(event, data);
    };

    AddConnectHandler (callback) {
        if (!this.onConnectHandlers.includes(callback) && typeof callback === 'function') {
            this.onConnectHandlers.push(callback);
        }
    }
}

module.exports = new SocketService();
