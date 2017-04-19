import { expect } from "chai";

import Board from "../source/javascripts/board";

describe("board", () => {
  let board;

  beforeEach(() => board = new Board(3));

  describe("#constructor", () => {

    it('sets the size', () => {
      expect(board.size).to.equal(3);
    });

    it("sets the values to null", () => {
      expect(board.get(0, 0)).to.equal(null);
    });
  });

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

        for (let row = 0; row < 3; row++) {
          for (let column = 0; column < 3; column++) {
            expect(board.get(row, column)).to.equal(null);
          }
        }
      });
    });
  })
});
