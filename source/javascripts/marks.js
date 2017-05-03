export const PLAYER_MARK = "x";
export const OPPONENT_MARK = "o";

const OTHER_MARK = {
  [PLAYER_MARK]: OPPONENT_MARK,
  [OPPONENT_MARK]: PLAYER_MARK
};

export function otherMark(mark) {
  return OTHER_MARK[mark];
}
