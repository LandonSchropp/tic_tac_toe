import _ from "lodash";

const mark = "o";
const delay = 250;

export default class Opponent {

  constructor(board) {
    this.board = board;
  }

  move(callback) {

    // Use a delay to make the AI seem a little more "human"
    setTimeout(() => {

      // Pick a random space on the board and make the move
      callback(..._.sample(this.board.emptySpaces()), mark);

    }, delay);
  }
}
