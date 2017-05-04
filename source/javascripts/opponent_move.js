import _ from "lodash";

import { boardEmptySpaces, boardSet } from "./board";
import minimaxScore from "./minimax_score";

// Defines how perfect the AI plays the game
const DIFFICULTY = 0.85;

// Returns a promise that resolves to the move for the opponent.
export default function opponentMove(board) {

  // Get the available spaces
  let emptySpaces = boardEmptySpaces(board);

  // Every once in a while, play a random move
  if (Math.random() > DIFFICULTY) { return Promise.resolve(_.sample(emptySpaces)); }

  // Play the best possible move
  return Promise.resolve(_.minBy(emptySpaces, (space) => {
    return minimaxScore(boardSet(board, ...space, "o"), "x")
  }));
}
