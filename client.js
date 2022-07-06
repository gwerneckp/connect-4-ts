"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
// @ts-ignore
const prompt_async_1 = __importDefault(require("prompt-async"));
const IP_ADRESS = "localhost";
const PORT = "3000";
// @ts-ignore
var socket = socket_io_client_1.io.connect(`http://${IP_ADRESS}:${PORT}`, { reconnection: true });
socket.on("connect", function (socket) {
    console.log(`Connected to HTTP server on ${IP_ADRESS}:${PORT}`);
});
const showStage = (stage) => {
    let stageLog = "";
    for (let i in stage) {
        let row = "";
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
const getPlayer = (players, socket) => {
    if (players.A === socket.id) {
        return "A";
    }
    if (players.B === socket.id) {
        return "B";
    }
    return "";
};
const rightTurn = (player, turn) => {
    if (player === turn) {
        return true;
    }
    return false;
};
socket.on("game", (players, game) => __awaiter(void 0, void 0, void 0, function* () {
    let player = getPlayer(players, socket);
    console.log("\n");
    console.log(showStage(game.stage));
    console.log("\n");
    if (rightTurn(player, game.turn)) {
        prompt_async_1.default.start();
        const userInput = yield prompt_async_1.default.get("column");
        const column = userInput.column;
        socket.emit("game", column);
    }
}));
