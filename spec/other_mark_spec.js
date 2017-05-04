import { expect } from "chai";

import otherMark from "../source/javascripts/other_mark";

describe("otherMark", () => {

  context("when the mark is the player's mark", () => {

    it("returns the opponent's mark", () => {
      expect(otherMark("x")).to.equal("o");
    })
  });

  context("when the mark is the opponent's mark", () => {

    it("returns the player's mark", () => {
      expect(otherMark("o")).to.equal("x");
    })
  });
});
