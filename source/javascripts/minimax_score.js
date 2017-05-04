import { BOARD_SIZE, boardEmptySpaces, boardSet, boardWinner, boardNumberOfMarks } from "./board";
import otherMark from "./other_mark";

// This algorithm implemented by following the methodology in [this](https://goo.gl/ktYe7r)
// excellent article. The alpha-beta pruning component was taken from [here](https://goo.gl/Z4arB6).

// A number larger than the total possible number of moves on the board.
const SCORE_BOUND = BOARD_SIZE * BOARD_SIZE + 1;

// Initialize the constants for alpha-beta pruning. Alpha represents the best option explored along
// the path for `"x"`. Beta represents the best option explored for `"o"`.
const ALPHA = Number.MIN_VALUE;
const BETA = Number.MAX_VALUE;

// Returns the minimax score for the provided board.
export default function minimaxScore(board, mark, alpha = ALPHA, beta = BETA) {

  // If the game is over, return the appropriate score
  switch(boardWinner(board)) {
    case "x":
      return SCORE_BOUND - boardNumberOfMarks(board);
    case "o":
      return -SCORE_BOUND + boardNumberOfMarks(board);
    case "draw":
      return 0;
  }

  let emptySpaces = boardEmptySpaces(board);

  // NOTE: The for loop is used as an optimiztion to let us break early.
  for (let i = 0; i < emptySpaces.length; i++) {

    // Get the score for the possible board
    let score = minimaxScore(
      boardSet(board, ...emptySpaces[i], mark),
      otherMark(mark),
      alpha,
      beta
    );

    // Set alpha or beta.
    if (mark === "x")
      alpha = alpha > score ? alpha : score;
    else
      beta = beta < score ? beta : score;

    // If the alpha-beta pruning condition is satisfied, break early.
    if (alpha >= beta) break;
  }

  // Return the score
  return mark === "x" ? alpha : beta;
}
