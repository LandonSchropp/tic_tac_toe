import _ from "lodash";
import { BOARD_SIZE, boardEmptySpaces, boardSet, boardResult, boardNumberOfMarks } from "./board";
import { PLAYER_MARK, OPPONENT_MARK, otherMark } from "./marks";

// This algorithm implemented by following the methodology in this excellent article:
// https://mostafa-samir.github.io/Tic-Tac-Toe-AI/.

// A number larger than the total possible number of moves on the board.
const SCORE_BOUND = BOARD_SIZE * BOARD_SIZE + 1;

// Returns the minimax score for the provided board.
export default function minimaxScore(board, mark) {

  // If the game is over, return the appropriate score
  switch(boardResult(board)) {
    case PLAYER_MARK:
      return SCORE_BOUND - boardNumberOfMarks(board);
    case OPPONENT_MARK:
      return -SCORE_BOUND + boardNumberOfMarks(board);
    case "draw":
      return 0;
  }

  // Map all of the possible moves to their scores
  let scores = boardEmptySpaces(board).map(([ row, column ]) => {
    return minimaxScore(boardSet(board, row, column, mark), otherMark(mark));
  });

  // Determine whether to maximize or minimize the score (depending on who's playing).
  return (mark === PLAYER_MARK ? _.max : _.min)(scores);
}
