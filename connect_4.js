"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor() {
        this.stage = [
            ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
            ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
            ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
            ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
            ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
            ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
            ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
        ];
        this.turn = "A";
    }
    play(column, player) {
        if (player != this.turn) {
            return `It is player ${player}'s turn.`;
        }
        let ctx = this.dropColumn(column, player);
        if (ctx === false) {
            return `This column is full`;
        }
        this.changeTurn();
        if (this.checkConnect(ctx.row, ctx.column)) {
            console.log("game finished");
        }
    }
    dropColumn(column, player) {
        for (let i = 0; i < this.stage.length; i++) {
            if (!this.isEmpty(i, column)) {
                console.log(`row: ${i} | column ${column} | Is Empty?: ${this.isEmpty(i, column)}`);
                return false;
            }
            if (this.stage[i + 1] && !this.isEmpty(i + 1, column)) {
                this.stage[i][column] = player;
                return {
                    row: i,
                    column: column,
                    player: player,
                };
            }
            if (!this.stage[i + 1] && this.isEmpty(i, column)) {
                this.stage[i][column] = player;
                return {
                    row: i,
                    column: column,
                    player: player,
                };
            }
        }
        return false;
    }
    isEmpty(row, column) {
        if (this.stage[row] == undefined) {
            return false;
        }
        if (this.stage[row][column] === "Empty") {
            return true;
        }
        else {
            return false;
        }
    }
    checkPlayer(row, column, player) {
        if (this.stage[row] == undefined) {
            return false;
        }
        if (this.stage[row][column] === player) {
            return true;
        }
        else {
            return false;
        }
    }
    changeTurn() {
        if (this.turn === "A") {
            this.turn = "B";
        }
        else {
            this.turn = "A";
        }
    }
    checkConnect(row, column) {
        if (this.isEmpty(row, column)) {
            return false;
        }
        let player = this.stage[row][column];
        if (this.checkPlayer(row + 1, column, player)) {
            if (this.checkPlayer(row + 2, column, player)) {
                if (this.checkPlayer(row + 3, column, player)) {
                    return true;
                }
            }
        }
        if (this.checkPlayer(row - 1, column, player)) {
            if (this.checkPlayer(row - 2, column, player)) {
                if (this.checkPlayer(row - 3, column, player)) {
                    return true;
                }
            }
        }
        if (this.checkPlayer(row, column + 1, player)) {
            if (this.checkPlayer(row, column + 1, player)) {
                if (this.checkPlayer(row, column + 1, player)) {
                    return true;
                }
            }
        }
        if (this.checkPlayer(row, column - 1, player)) {
            if (this.checkPlayer(row, column - 1, player)) {
                if (this.checkPlayer(row, column - 1, player)) {
                    return true;
                }
            }
        }
        if (this.checkPlayer(row + 1, column + 1, player)) {
            if (this.checkPlayer(row + 2, column + 1, player)) {
                if (this.checkPlayer(row + 3, column + 1, player)) {
                    return true;
                }
            }
        }
        if (this.checkPlayer(row + 1, column - 1, player)) {
            if (this.checkPlayer(row + 2, column - 1, player)) {
                if (this.checkPlayer(row + 3, column - 1, player)) {
                    return true;
                }
            }
        }
        if (this.checkPlayer(row - 1, column + 1, player)) {
            if (this.checkPlayer(row - 2, column + 1, player)) {
                if (this.checkPlayer(row - 3, column + 1, player)) {
                    return true;
                }
            }
        }
        if (this.checkPlayer(row - 1, column - 1, player)) {
            if (this.checkPlayer(row - 2, column - 1, player)) {
                if (this.checkPlayer(row - 3, column - 1, player)) {
                    return true;
                }
            }
        }
        return false;
    }
    print() {
        for (let i in this.stage) {
            let row = "";
            for (let j in this.stage[i]) {
                switch (this.stage[i][j]) {
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
            console.log(row);
        }
    }
}
exports.Game = Game;
