import _ from "lodash";

const mark = "o";
const delay = 250;

export default class Opponent {

  constructor(board) {
    this.board = board;
    this.mark = mark;
  }

  move() {

    return new Promise(resolve => {

      // Pick a random space on the board and make the move. Use a delay to make the AI seem a
      // little more "human".
      setTimeout(() => resolve(_.sample(this.board.emptySpaces())), delay);
    });
  }
}
