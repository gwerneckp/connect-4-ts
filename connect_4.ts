export type Player = "A" | "B";
export type Block = Player | "Empty" | "Null";
type BlockInfo =
  | {
      row: number;
      column: number;
      player: Player;
    }
  | false;

export class Game {
  stage: Array<Array<Block>> = [
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
  ];

  turn: Player = "A";

  constructor() {}

  play(column: number, player: Player) {
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

  dropColumn(column: number, player: Player): BlockInfo {
    for (let i = 0; i < this.stage.length; i++) {
      if (!this.isEmpty(i, column)) {
        console.log(`row: ${i} | column ${column} | Is Empty?: ${this.isEmpty(i, column)}`)
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

  isEmpty(row: number, column: number) {
    if (this.stage[row] == undefined) {
      return false;
    }
    if (this.stage[row][column] === "Empty") {
      return true;
    } else {
      return false;
    }
  }

  checkPlayer(row: number, column: number, player: Player) {
    if (this.stage[row] == undefined) {
      return false;
    }
    if (this.stage[row][column] === player) {
      return true;
    } else {
      return false;
    }
  }

  changeTurn() {
    if (this.turn === "A") {
      this.turn = "B";
    } else {
      this.turn = "A";
    }
  }

  checkConnect(row: number, column: number) {
    if (this.isEmpty(row, column)) {
      return false;
    }
    let player = this.stage[row][column];

    if (this.checkPlayer(row + 1, column, player as Player)) {
      if (this.checkPlayer(row + 2, column, player as Player)) {
        if (this.checkPlayer(row + 3, column, player as Player)) {
          return true;
        }
      }
    }

    if (this.checkPlayer(row - 1, column, player as Player)) {
      if (this.checkPlayer(row - 2, column, player as Player)) {
        if (this.checkPlayer(row - 3, column, player as Player)) {
          return true;
        }
      }
    }

    if (this.checkPlayer(row, column + 1, player as Player)) {
      if (this.checkPlayer(row, column + 1, player as Player)) {
        if (this.checkPlayer(row, column + 1, player as Player)) {
          return true;
        }
      }
    }

    if (this.checkPlayer(row, column - 1, player as Player)) {
      if (this.checkPlayer(row, column - 1, player as Player)) {
        if (this.checkPlayer(row, column - 1, player as Player)) {
          return true;
        }
      }
    }

    if (this.checkPlayer(row + 1, column + 1, player as Player)) {
      if (this.checkPlayer(row + 2, column + 1, player as Player)) {
        if (this.checkPlayer(row + 3, column + 1, player as Player)) {
          return true;
        }
      }
    }

    if (this.checkPlayer(row + 1, column - 1, player as Player)) {
      if (this.checkPlayer(row + 2, column - 1, player as Player)) {
        if (this.checkPlayer(row + 3, column - 1, player as Player)) {
          return true;
        }
      }
    }

    if (this.checkPlayer(row - 1, column + 1, player as Player)) {
      if (this.checkPlayer(row - 2, column + 1, player as Player)) {
        if (this.checkPlayer(row - 3, column + 1, player as Player)) {
          return true;
        }
      }
    }

    if (this.checkPlayer(row - 1, column - 1, player as Player)) {
      if (this.checkPlayer(row - 2, column - 1, player as Player)) {
        if (this.checkPlayer(row - 3, column - 1, player as Player)) {
          return true;
        }
      }
    }

    return false;
  }

  print() {
    for (let i in this.stage) {
      let row: string = "";
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
