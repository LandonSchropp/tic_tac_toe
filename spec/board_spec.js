import _ from "lodash";
import { expect } from "chai";

import {
  BOARD_SIZE,
  EMPTY_BOARD,
  BOARD_SPACES,
  boardGet,
  boardSet,
  boardIsSpaceEmpty,
  boardEmptySpaces,
  boardWinnerSpaces,
  boardNumberOfMarks,
  boardWinner
} from "../source/javascripts/board";

let board;

describe("boardGet", () => {
  beforeEach(() => board = boardSet(EMPTY_BOARD, 1, 2, "x"));

  context("when the space is empty", () => {

    it("returns null", () => {
      expect(boardGet(EMPTY_BOARD, 1, 2)).to.equal(null);
    });
  });

  context("when the space contains a value", () => {

    it("returns the value", () => {
      expect(boardGet(board, 1, 2)).to.equal("x");
    });
  });

  context("when the coordinates are out of bounds", () => {

    it("returns undefined", () => {
      expect(boardGet(board, 2, -2)).to.be.undefined;
    });
  });
});

describe("boardSet", () => {

  context("when the coordinates are in bounds", () => {

    it("sets the value", () => {
      board = boardSet(EMPTY_BOARD, 1, 2, "x");
      expect(boardGet(board, 1, 2)).to.equal("x");
    });
  });

  context("when the coordinates are out of bounds", () => {

    it("doesn't set a value", () => {
      board = boardSet(boardSet(EMPTY_BOARD, -1, -2, "x"), 1000, 1000, "o");

      _.times(BOARD_SIZE, row => {
        _.times(BOARD_SIZE, column => {
          expect(boardGet(board, row, column)).to.equal(null);
        });
      });
    });
  });
});

describe("boardIsSpaceEmpty", () => {
  beforeEach(() => board = boardSet(EMPTY_BOARD, 1, 2, "x"));

  context("when the space is empty", () => {

    it("returns true", () => {
      expect(boardIsSpaceEmpty(EMPTY_BOARD, 1, 2)).to.equal(true);
    });
  });

  context("when the space contains a value", () => {

    it("returns the value", () => {
      expect(boardIsSpaceEmpty(board, 1, 2)).to.equal(false);
    });
  });

  context("when the coordinates are out of bounds", () => {

    it("returns undefined", () => {
      expect(boardIsSpaceEmpty(board, 2, -2)).to.be.undefined;
    });
  });
});

describe("boardEmptySpaces", () => {
  beforeEach(() => board = EMPTY_BOARD)

  context("when all of the spaces are empty", () => {

    it("returns all of the spaces", () => {
      expect(boardEmptySpaces(board)).to.eql(BOARD_SPACES);
    });
  });

  context("when some of the spaces are empty", () => {
    beforeEach(() => {
      BOARD_SPACES
        .filter(([ row, column ]) => row + column !== 2)
        .forEach(([ row, column ]) => board = boardSet(board, row, column, "x"));
    });

    it("returns the empty spaces", () => {
      expect(boardEmptySpaces(board)).to.eql([ [ 0, 2 ], [ 1, 1 ], [ 2, 0 ] ]);
    });
  });

  context("when none of the spaces are empty", () => {
    beforeEach(() => {
      BOARD_SPACES.forEach(([ row, column ]) => board = boardSet(board, row, column, "x"))
    });

    it("returns an empty array", () => {
      expect(boardEmptySpaces(board)).to.eql([]);
    });
  });
});

describe("boardWinnerSpaces", () => {
  beforeEach(() => board = EMPTY_BOARD)

  context("when a player has won", () => {
    beforeEach(() => {
      board = boardSet(board, 1, 0, "x");
      board = boardSet(board, 1, 1, "x");
      board = boardSet(board, 1, 2, "x");
    });

    it("returns the winning spaces", () => {
      expect(boardWinnerSpaces(board)).to.eql([ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ]);
    });
  });

  context("when a player has not won", () => {

    it("returns null", () => {
      expect(boardWinnerSpaces(board)).to.equal(null);
    });
  });
});

describe("boardMovesCount", () => {
  beforeEach(() => board = EMPTY_BOARD)

  context("when all of the spaces are empty", () => {

    it("returns 0", () => {
      expect(boardNumberOfMarks(board)).to.equal(0);
    });
  });

  context("when some of the spaces are empty", () => {
    beforeEach(() => {
      BOARD_SPACES
        .filter(([ row, column ]) => row + column === 2)
        .forEach(([ row, column ]) => board = boardSet(board, row, column, "x"));
    });

    it("returns the number of non-empty spaces", () => {
      expect(boardNumberOfMarks(board)).to.eql(3);
    });
  });

  context("when none of the spaces are empty", () => {
    beforeEach(() => {
      BOARD_SPACES.forEach(([ row, column ]) => board = boardSet(board, row, column, "x"))
    });

    it("returns the number of spaces in the board", () => {
      expect(boardNumberOfMarks(board)).to.eql(9);
    });
  });
});

describe("boardWinner", () => {
  beforeEach(() => board = EMPTY_BOARD)

  context("when the board is empty", () => {

    it("returns null", () => {
      expect(boardWinner(board)).to.equal(null);
    });
  });

  context("when no player has won", () => {
    beforeEach(() => {
      board = boardSet(board, 1, 0, "x");
      board = boardSet(board, 1, 1, "o");
      board = boardSet(board, 1, 2, "x");
    });

    it("returns null", () => {
      expect(boardWinner(board)).to.equal(null);
    });
  });

  context("when a player has a horizontal win", () => {
    beforeEach(() => {
      board = boardSet(board, 1, 0, "x");
      board = boardSet(board, 1, 1, "x");
      board = boardSet(board, 1, 2, "x");
    });

    it("returns the player's mark", () => {
      expect(boardWinner(board)).to.equal("x");
    });
  });

  context("when the player has a vertical win", () => {
    beforeEach(() => {
      board = boardSet(board, 0, 0, "o");
      board = boardSet(board, 1, 0, "o");
      board = boardSet(board, 2, 0, "o");
    });

    it("returns the player's mark", () => {
      expect(boardWinner(board)).to.equal("o");
    });
  });

  context("when the player has a diagonal win", () => {
    beforeEach(() => {
      board = boardSet(board, 0, 0, "x");
      board = boardSet(board, 1, 1, "x");
      board = boardSet(board, 2, 2, "x");
    });

    it("returns the player's mark", () => {
      expect(boardWinner(board)).to.equal("x");
    });
  });

  context("when the player has a reverse diagonal win", () => {
    beforeEach(() => {
      board = boardSet(board, 0, 2, "o");
      board = boardSet(board, 1, 1, "o");
      board = boardSet(board, 2, 0, "o");
    });

    it("returns the player's mark", () => {
      expect(boardWinner(board)).to.equal("o");
    });
  });

  context("when the game is a draw", () => {
    beforeEach(() => {
      board = boardSet(board, 0, 0, "o");
      board = boardSet(board, 0, 1, "x");
      board = boardSet(board, 0, 2, "o");
      board = boardSet(board, 1, 0, "o");
      board = boardSet(board, 1, 1, "x");
      board = boardSet(board, 1, 2, "o");
      board = boardSet(board, 2, 0, "x");
      board = boardSet(board, 2, 1, "o");
      board = boardSet(board, 2, 2, "x");
    });

    it("returns 'draw'", () => {
      expect(boardWinner(board)).to.equal("draw");
    });
  });
});
