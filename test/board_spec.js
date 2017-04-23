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
  });

  describe("#spaces", () => {

    it("returns all of the spaces", () => {
      let spaces = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
      expect(board.spaces()).to.eql(spaces);
    });
  });

  // TODO: These tests are currently dependent on the order the algorithm outputs the points in.
  // They should be rewritten to not rely on a specific implementation.
  describe("#emptySpaces", () => {

    context("all of the spaces are empty", () => {

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

  describe("#connections", () => {
    beforeEach(() => board = new Board(5));

    context("when the board does not contain any connections", () => {

      it("returns an empty array", () => {

        it("returns the connection", () => {
          expect(board.connections("x")).to.eql([]);
        });
      });
    });

    context("when the board contains elements less than the minimum connection length", () => {

    });

    context("when the board contains a horizontal connection", () => {
      beforeEach(() => {
        board.set(0, 0, "x");
        board.set(0, 1, "x");
        board.set(0, 2, "x");
      });

      it("returns the connection", () => {
        expect(board.connections("x")).to.eql([ [ [0, 0], [0, 2] ] ]);
      });
    });

    context("when the board contains a vertical connection", () => {
      beforeEach(() => {
        board.set(2, 4, "x");
        board.set(3, 4, "x");
        board.set(4, 4, "x");
      });

      it("returns the connection", () => {
        expect(board.connections("x")).to.eql([ [ [2, 4], [4, 4] ] ]);
      });
    });

    context("when the board contains a diagonal connection", () => {
      beforeEach(() => {
        board.set(2, 2, "x");
        board.set(3, 3, "x");
        board.set(4, 4, "x");
      });

      it("returns the connection", () => {
        expect(board.connections("x")).to.eql([ [ [2, 2], [4, 4] ] ]);
      });
    });

    context("when the board contains a reversedDiagonal connection", () => {
      beforeEach(() => {
        board.set(4, 0, "x");
        board.set(3, 1, "x");
        board.set(2, 2, "x");
      });

      it("returns the connection", () => {
        expect(board.connections("x")).to.eql([ [ [2, 2], [4, 0] ] ]);
      });
    });

    context("when the board contains a long connection", () => {
      beforeEach(() => {
        board.set(4, 0, "x");
        board.set(3, 1, "x");
        board.set(2, 2, "x");
        board.set(1, 3, "x");
        board.set(0, 4, "x");
      });

      it("returns the full connection", () => {
        expect(board.connections("x")).to.eql([ [ [0, 4], [4, 0] ] ]);
      });
    });

    context("when the board contains multiple mark connections", () => {
      beforeEach(() => {
        board.set(0, 0, "x");
        board.set(0, 1, "x");
        board.set(0, 2, "x");
        board.set(1, 0, "o");
        board.set(1, 1, "o");
        board.set(1, 2, "o");
      });

      it("only returns the connections for the mark", () => {
        expect(board.connections("x")).to.eql([ [ [0, 0], [0, 2] ] ]);
      });
    });

    context("when the board contains multiple connections for the mark", () => {
      beforeEach(() => {
        board.set(0, 0, "x");
        board.set(0, 1, "x");
        board.set(0, 2, "x");
        board.set(1, 0, "x");
        board.set(1, 1, "x");
        board.set(1, 2, "x");
        board.set(2, 0, "x");
        board.set(2, 1, "x");
        board.set(2, 2, "x");
      });

      it("returns all of the connections", () => {
        expect(board.connections("x")).to.eql([
          [ [0, 0], [0, 2] ],
          [ [0, 0], [2, 0] ],
          [ [0, 0], [2, 2] ],
          [ [0, 1], [2, 1] ],
          [ [0, 2], [2, 2] ],
          [ [0, 2], [2, 0] ],
          [ [1, 0], [1, 2] ],
          [ [2, 0], [2, 2] ]
        ]);
      });
    });
  });

  // describe("#score", () => {
  //
  //   context("when the board doesn't contain any marks", () => {
  //
  //     it("only returns the sum of for the connections with the same mark", () => {
  //
  //     });
  //   });
  //
  //   context("when the board contains a connection", () => {
  //
  //     it("only returns the sum of for the connections with the same mark", () => {
  //
  //     });
  //   })
  //
  //   context("when the board contains multiple connections", () => {
  //
  //     it("only returns the sum of for the connections with the same mark", () => {
  //
  //     });
  //   });
  //
  //   context("when the board contains connections for different marks", () => {
  //
  //     it("only returns the sum of for the connections with the same mark", () => {
  //
  //     });
  //   });
  // });
});
