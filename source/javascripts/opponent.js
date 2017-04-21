import _ from "lodash";

const mark = "o";

export default class Opponent {

  constructor(mark, board) {
    this.mark = mark;
    this.board = board;
  }

  move(callback) {

    // Pick a random space on the board and make the move
    callback(..._.sample(this.board.emptySpaces()), mark);
  }
}
