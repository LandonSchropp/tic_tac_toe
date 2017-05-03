import _ from "lodash";

const mark = "o";

// The AI for this class was implemented by following the methodology in this excellent article:
// https://mostafa-samir.github.io/Tic-Tac-Toe-AI/.
export default class Opponent {

  constructor(board) {
    this.board = board;
    this.mark = mark;
  }

  move() {

    return new Promise(resolve => {

      // Pick a random space on the board and make the move. Use a delay to make the AI seem a
      // little more "human".
      resolve(this.bestMove());
    });
  }

  bestMove() {
    return _.minBy(this.board.emptySpaces(), ([row, column]) => {
      let clonedBoard = this.board.clone();
      clonedBoard.set(row, column, mark);
      let score = this.minimaxScore(clonedBoard, "x");
      return score;
    });
  }

  randomMove() {
    return _.sample(this.board.emptySpaces());
  }

  // This is a *really* rough implementation that could be cleaned up and optimized quite a bit.
  // Even some simple momoization would make it run much faster. However, at the moment it's not
  // worth the effort.

  minimaxScore(board, currentMark) {

    // In the base case, determine the score for the player.
    if (board.isGameOver()) {
      let winner = board.winner();
      return _.isNil(winner) ? 0 : ((winner === "x" ? 1 : -1) * (10 - board.movesCount()));
    }

    // Map all of the possible moves to their score
    let scores = board.emptySpaces().map(([row, column]) => {
      let clonedBoard = board.clone();
      clonedBoard.set(row, column, currentMark);
      return this.minimaxScore(clonedBoard, currentMark === "x" ? "o" : "x");
    });

    // Determine whether to maximize or minimize the score (depending on who's playing)
    return (currentMark === "x" ? _.max : _.min)(scores);
  }
}
