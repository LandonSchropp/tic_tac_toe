import _ from "lodash";

import { boardEmptySpaces, boardSet } from "./board";
import minimaxScore from "./minimax_score";
import { PLAYER_MARK, OPPONENT_MARK } from "./marks";

// Returns a promise that resolves to the move for the opponent.
export default function opponentMove(board) {
  return new Promise(resolve => {
    resolve(_.minBy(boardEmptySpaces(board), (space) => {
      return minimaxScore(boardSet(board, ...space, OPPONENT_MARK), PLAYER_MARK)
    }));
  });
}
