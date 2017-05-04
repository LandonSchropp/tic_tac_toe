import _ from "lodash";

import { boardEmptySpaces, boardSet } from "./board";
import minimaxScore from "./minimax_score";

// Defines how perfect the AI plays the game
const DIFFICULTY = 0.9;

// Returns a promise that resolves to the move for the opponent.
export default function opponentMove(board) {
  return new Promise(resolve => {
    let spaces = boardEmptySpaces(board);

    // Every once in a while, play a random move
    if (Math.random() > DIFFICULTY) { resolve(_.sample(spaces)); }

    // Play the best possible move
    resolve(_.minBy(spaces, (space) => {
      return minimaxScore(boardSet(board, ...space, "o"), "x")
    }));
  });
}
