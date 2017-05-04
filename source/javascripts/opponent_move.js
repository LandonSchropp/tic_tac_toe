import _ from "lodash";

import { boardEmptySpaces, boardSet } from "./board";
import minimaxScore from "./minimax_score";

// The level of difficulty of the AI.
const DIFFICULTY = 0.85;

// How long the AI should wait before moving
const MOVE_DELAY = 500;

// Returns a promise that resolves to the move for the opponent.
export default function opponentMove(board) {

  return new Promise(resolve => {

    // Delay the opponent's action to make it seem like the opponent is thinking
    setTimeout(() => {

      // Get the available spaces
      let emptySpaces = boardEmptySpaces(board);

      // Every once in a while, play a random move
      if (Math.random() > DIFFICULTY) { return resolve(_.sample(emptySpaces)); }

      // Pick the best possible space
      let idealSpace = _.minBy(emptySpaces, (space) => {
        return minimaxScore(boardSet(board, ...space, "o"), "x")
      });

      // Resolve with the space
      resolve(idealSpace)
    }, MOVE_DELAY);
  });
}
