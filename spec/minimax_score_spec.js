import { expect } from "chai";

import { EMPTY_BOARD, boardSet, } from "../source/javascripts/board";
import minimaxScore from "../source/javascripts/minimax_score";

describe("minimaxScore", () => {
  let board;

  beforeEach(() => {
    board = EMPTY_BOARD;
    board = boardSet(board, 0, 0, "x");
    board = boardSet(board, 0, 1, "x");
    board = boardSet(board, 0, 2, "o");
    board = boardSet(board, 1, 0, "o");
    board = boardSet(board, 2, 0, "o");
    board = boardSet(board, 2, 1, "x");
  });

  context("when the player has won with no empty spaces", () => {
    beforeEach(() => {
      board = boardSet(board, 1, 1, "x");
      board = boardSet(board, 1, 2, "o");
      board = boardSet(board, 2, 2, "x");
    })

    it("returns the correct minimum positive score", () => {
      expect(minimaxScore(board, "o")).to.equal(1);
    });
  });

  context("when the player has won with empty spaces", () => {
    beforeEach(() => board = boardSet(board, 1, 1, "x"))

    it("returns the correct positive score", () => {
      expect(minimaxScore(board, "o")).to.equal(3);
    });
  });

  context("when the opponent has won with no empty spaces", () => {
    beforeEach(() => {
      board = boardSet(board, 1, 1, "o");
      board = boardSet(board, 1, 2, "x");
      board = boardSet(board, 2, 2, "o");
    })

    it("returns the correct minimum negative score", () => {
      expect(minimaxScore(board, "x")).to.equal(-1);
    });
  });

  context("when the opponent has won with no empty spaces", () => {
    beforeEach(() => board = boardSet(board, 1, 1, "o"))

    it("returns the correct negative score", () => {
      expect(minimaxScore(board, "x")).to.equal(-3);
    });
  });

  context("when the game is a draw", () => {
    beforeEach(() => {
      board = boardSet(board, 0, 1, "o");
      board = boardSet(board, 1, 1, "x");
      board = boardSet(board, 1, 2, "x");
      board = boardSet(board, 2, 2, "o");
    })

    it("returns the correct negative score", () => {
      expect(minimaxScore(board, "o")).to.equal(0);
    });
  });

  context("when the game is still in progress", () => {

    context("and the mark is the player's", () => {

      it("returns the maximum positive score", () => {
        expect(minimaxScore(board, "x")).to.equal(3);
      });
    });

    context("and the mark is the opponent's", () => {

      it("returns the minimum negative score", () => {
        expect(minimaxScore(board, "o")).to.equal(-3);
      });
    });
  })
});
