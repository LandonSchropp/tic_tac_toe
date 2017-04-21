import _ from "lodash";

export default class AIPlayer {

  constructor(mark, board) {
    this.mark = mark;
    this.board = board;
  }

  move(callback) {

    // Pick a random space on the board and make the move
    callback(..._.sample(this.board.emptySpaces()), this.mark);
  }
}
