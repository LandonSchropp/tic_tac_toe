import _ from "lodash";
import { expect } from "chai";

import Board from "../source/javascripts/board";

describe("Board", () => {
  let board;

  beforeEach(() => board = new Board());

  describe("#get", () => {

    context("when the space is empty", () => {

      it("returns null", () => {
        expect(board.get(1, 2)).to.equal(null);
      });
    });

    context("when the space contains a value", () => {
      beforeEach(() => board.set(1, 2, "x"));

      it("returns the value", () => {
        expect(board.get(1, 2)).to.equal("x");
      });
    });

    context("when the coordinates are out of bounds", () => {

      it("returns undefined", () => {
        expect(board.get(-1, -2)).to.be.undefined;
      });
    });
  });

  describe("#set", () => {

    context("when the coordinates are in bounds", () => {

      it("sets the value", () => {
        board.set(1, 2, "x");
        expect(board.get(1, 2)).to.equal("x");
      });
    });

    context("when the coordinates are out of bounds", () => {

      it("doesn't set a value", () => {
        board.set(-1, -2, "x");
        board.set(1000, 1000, "o");

        _.times(3).forEach(row => {
          _.times(3).forEach(column => {
            expect(board.get(row, column)).to.equal(null);
          });
        });
      });
    });
  });

  describe("#spaces", () => {

    it("returns all of the spaces", () => {
      let spaces = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
      expect(board.spaces()).to.eql(spaces);
    });
  });

  describe("#emptySpaces", () => {

    context("when all of the spaces are empty", () => {

      it("returns all of the spaces", () => {
        expect(board.emptySpaces()).to.eql(board.spaces());
      });
    });

    context("when some of the spaces are empty", () => {
      beforeEach(() => {
        board
          .spaces()
          .filter(([row, column]) => row + column !== 2)
          .forEach(([row, column]) => board.set(row, column, "x"))
      });

      it("returns the empty spaces", () => {
        expect(board.emptySpaces()).to.eql([[0, 2], [1, 1], [2, 0]]);
      });
    });

    context("when none of the spaces are empty", () => {
      beforeEach(() => board.spaces().forEach(([row, column]) => board.set(row, column, "x")));

      it("returns an empty line", () => {
        expect(board.emptySpaces()).to.eql([]);
      });
    });
  });

  describe("#winnerCoordinates", () => {

    context("when a player has won", () => {
      beforeEach(() => {
        board.set(1, 0, "x");
        board.set(1, 1, "x");
        board.set(1, 2, "x");
      });

      it("returns null", () => {
        expect(board.winnerCoordinates()).to.eql([ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ]);
      });
    });

    context("when a player has not won", () => {

      it("returns null", () => {
        expect(board.winnerCoordinates()).to.equal(null);
      });
    });
  });

  describe("#winner", () => {

    context("when the board is empty", () => {

      it("returns null", () => {
        expect(board.winner()).to.equal(null);
      });
    });

    context("when no player has won", () => {
      beforeEach(() => {
        board.set(1, 0, "x");
        board.set(1, 1, "o");
        board.set(1, 2, "x");
      });

      it("returns null", () => {
        expect(board.winner()).to.equal(null);
      });
    });

    context("when the player has a horizontal win", () => {
      beforeEach(() => {
        board.set(1, 0, "x");
        board.set(1, 1, "x");
        board.set(1, 2, "x");
      });

      it("returns the player's mark", () => {
        expect(board.winner()).to.equal("x");
      });
    });

    context("when the player has a vertical win", () => {
      beforeEach(() => {
        board.set(0, 0, "o");
        board.set(1, 0, "o");
        board.set(2, 0, "o");
      });

      it("returns the player's mark", () => {
        expect(board.winner()).to.equal("o");
      });
    });

    context("when the player has a diagonal win", () => {
      beforeEach(() => {
        board.set(0, 0, "x");
        board.set(1, 1, "x");
        board.set(2, 2, "x");
      });

      it("returns the player's mark", () => {
        expect(board.winner()).to.equal("x");
      });
    });

    context("when the player has a reverse diagonal win", () => {
      beforeEach(() => {
        board.set(0, 2, "o");
        board.set(1, 1, "o");
        board.set(2, 0, "o");
      });

      it("returns the player's mark", () => {
        expect(board.winner()).to.equal("o");
      });
    });
  });

  describe("#isGameOver", () => {

    context("when a player has won", () => {
      beforeEach(() => {
        board.set(0, 0, "o");
        board.set(0, 1, "o");
        board.set(0, 2, "o");
      });

      it("returns true", () => {
        expect(board.isGameOver()).to.equal(true);
      });
    });

    context("when all of the spaces are filled", () => {
      beforeEach(() => {
        board.set(0, 0, "x");
        board.set(0, 1, "o");
        board.set(0, 2, "x");
        board.set(1, 0, "x");
        board.set(1, 1, "o");
        board.set(1, 2, "x");
        board.set(2, 0, "o");
        board.set(2, 1, "x");
        board.set(2, 2, "o");
      });

      it("returns false", () => {
        expect(board.isGameOver()).to.equal(true);
      });
    });

    context("when the the board has empty spaces and a player hasn't won", () => {

      it("returns false", () => {
        expect(board.isGameOver()).to.equal(false);
      });
    });
  });
});
