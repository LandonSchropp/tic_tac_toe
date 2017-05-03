import { expect } from "chai";

import { PLAYER_MARK, OPPONENT_MARK } from "../source/javascripts/marks";
import { EMPTY_BOARD, boardSet, } from "../source/javascripts/board";
import minimaxScore from "../source/javascripts/minimax_score";

describe("minimaxScore", () => {
  let board;

  beforeEach(() => {
    board = EMPTY_BOARD;
    board = boardSet(board, 0, 0, PLAYER_MARK);
    board = boardSet(board, 0, 1, PLAYER_MARK);
    board = boardSet(board, 0, 2, OPPONENT_MARK);
    board = boardSet(board, 1, 0, OPPONENT_MARK);
    board = boardSet(board, 2, 0, OPPONENT_MARK);
    board = boardSet(board, 2, 1, PLAYER_MARK);
  });

  context("when the player has won with no empty spaces", () => {
    beforeEach(() => {
      board = boardSet(board, 1, 1, PLAYER_MARK);
      board = boardSet(board, 1, 2, OPPONENT_MARK);
      board = boardSet(board, 2, 2, PLAYER_MARK);
    })

    it("returns the correct minimum positive score", () => {
      expect(minimaxScore(board, OPPONENT_MARK)).to.equal(1);
    });
  });

  context("when the player has won with empty spaces", () => {
    beforeEach(() => board = boardSet(board, 1, 1, PLAYER_MARK))

    it("returns the correct positive score", () => {
      expect(minimaxScore(board, OPPONENT_MARK)).to.equal(3);
    });
  });

  context("when the opponent has won with no empty spaces", () => {
    beforeEach(() => {
      board = boardSet(board, 1, 1, OPPONENT_MARK);
      board = boardSet(board, 1, 2, PLAYER_MARK);
      board = boardSet(board, 2, 2, OPPONENT_MARK);
    })

    it("returns the correct minimum negative score", () => {
      expect(minimaxScore(board, PLAYER_MARK)).to.equal(-1);
    });
  });

  context("when the opponent has won with no empty spaces", () => {
    beforeEach(() => board = boardSet(board, 1, 1, OPPONENT_MARK))

    it("returns the correct negative score", () => {
      expect(minimaxScore(board, PLAYER_MARK)).to.equal(-3);
    });
  });

  context("when the game is a draw", () => {
    beforeEach(() => {
      board = boardSet(board, 0, 1, OPPONENT_MARK);
      board = boardSet(board, 1, 1, PLAYER_MARK);
      board = boardSet(board, 1, 2, PLAYER_MARK);
      board = boardSet(board, 2, 2, OPPONENT_MARK);
    })

    it("returns the correct negative score", () => {
      expect(minimaxScore(board, OPPONENT_MARK)).to.equal(0);
    });
  });

  context("when the game is still in progress", () => {

    context("and the mark is the player's", () => {

      it("returns the maximum positive score", () => {
        expect(minimaxScore(board, PLAYER_MARK)).to.equal(3);
      });
    });

    context("and the mark is the opponent's", () => {

      it("returns the minimum negative score", () => {
        expect(minimaxScore(board, OPPONENT_MARK)).to.equal(-3);
      });
    });
  })
});
