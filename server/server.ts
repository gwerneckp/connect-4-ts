import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { Game, Player } from "./connect_4";

const httpServer = createServer();
const io = new Server(httpServer);

const PORT = 3000;

let players = { A: "", B: "" };

const getPlayer = (socket: Socket): string => {
  if (players.A === socket.id) {
    return "A";
  }
  if (players.B === socket.id) {
    return "B";
  }
  return "";
};

const assingPlayer = (socket: Socket): string => {
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

const removeAndReassign = (socket: Socket): string => {
  if (players.A === socket.id) {
    players.A = "";
  }
  if (players.B === socket.id) {
    players.B = "";
  }
  return "";
};

let game = new Game();
io.on("connection", (socket: Socket) => {
  console.log(socket.id, "joined as", assingPlayer(socket));
  io.emit("game", players, game);
  socket.on("game", (column) => {
    let player = getPlayer(socket);
    if (player in { A: "", B: "" }) {
      console.log(game.play(parseInt(column), player as Player));
      io.emit("game", players, game);
    }
  });
  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected from", removeAndReassign(socket));
    io.emit("game", players, game);
  });
  socket.on("newRequest", () => {
    game = new Game();
    io.emit("game", players, game);
  });
});

console.log(`HTTP server listening on port ${PORT}`);
httpServer.listen(PORT);
