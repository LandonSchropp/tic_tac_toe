import { expect } from "chai";

import { PLAYER_MARK, OPPONENT_MARK, otherMark } from "../source/javascripts/marks";

describe("otherMark", () => {

  context("when the mark is the player's mark", () => {

    it("returns the opponent's mark", () => {
      expect(otherMark(PLAYER_MARK)).to.equal(OPPONENT_MARK);
    })
  });

  context("when the mark is the opponent's mark", () => {

    it("returns the player's mark", () => {
      expect(otherMark(OPPONENT_MARK)).to.equal(PLAYER_MARK);
    })
  });
});
