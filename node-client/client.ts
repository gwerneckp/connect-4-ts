type Player = "A" | "B";
type Block = Player | "Empty" | "Null";

import { io, Socket } from "socket.io-client";
// @ts-ignore
import prompt from "prompt-async";

const IP_ADRESS = "localhost";
const PORT = "3000";

// @ts-ignore
var socket = io.connect(`http://${IP_ADRESS}:${PORT}`, { reconnection: true });
socket.on("connect", function (socket: Socket) {
  console.log(`Connected to HTTP server on ${IP_ADRESS}:${PORT}`);
});

const showStage = (stage: Array<Array<Block>>): string => {
  let stageLog: string = "";
  for (let i in stage) {
    let row: string = "";
    for (let j in stage[i]) {
      switch (stage[i][j]) {
        case "Empty":
          row += " ▢ ";
          break;
        case "A":
          row += " A ";
          break;
        case "B":
          row += " B ";
          break;
          break;
      }
    }
    stageLog += row + "\n";
  }
  return stageLog;
};

const getPlayer = (players: any, socket: Socket): string => {
  if (players.A === socket.id) {
    return "A";
  }
  if (players.B === socket.id) {
    return "B";
  }
  return "";
};

const rightTurn = (player: string, turn: string): boolean => {
  if (player === turn) {
    return true;
  }
  return false;
};

socket.on("game", async (players: object, game: any) => {
  let player = getPlayer(players, socket);
  console.log("\n");
  console.log(showStage(game.stage));
  console.log("\n");
  if (rightTurn(player, game.turn)) {
    prompt.start();
    const userInput = await prompt.get("column");
    const column = userInput.column - 1;
    socket.emit("game", column);
  }
  if (game.turn === "End") {
    await prompt.get("Press anything to start new game");
    socket.emit("newRequest");
  }
});
