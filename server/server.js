"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const connect_4_1 = require("./connect_4");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer);
const PORT = 3000;
let players = { A: "", B: "" };
const getPlayer = (socket) => {
    if (players.A === socket.id) {
        return "A";
    }
    if (players.B === socket.id) {
        return "B";
    }
    return "";
};
const assingPlayer = (socket) => {
    if (players.A === "") {
        players.A = socket.id;
        return "A";
    }
    if (players.B === "") {
        players.B = socket.id;
        return "B";
    }
    return "";
};
const removeAndReassign = (socket) => {
    if (players.A === socket.id) {
        players.A = "";
    }
    if (players.B === socket.id) {
        players.B = "";
    }
    return "";
};
let game = new connect_4_1.Game();
io.on("connection", (socket) => {
    console.log(socket.id, "joined as", assingPlayer(socket));
    io.emit("game", players, game);
    socket.on("game", (column) => {
        let player = getPlayer(socket);
        if (player in { A: "", B: "" }) {
            console.log(game.play(parseInt(column), player));
            io.emit("game", players, game);
        }
    });
    socket.on("disconnect", () => {
        console.log(socket.id, "disconnected from", removeAndReassign(socket));
        io.emit("game", players, game);
    });
    socket.on("newRequest", () => {
        game = new connect_4_1.Game();
        io.emit("game", players, game);
    });
});
console.log(`HTTP server listening on port ${PORT}`);
httpServer.listen(PORT);
