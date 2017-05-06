import { BOARD_SIZE, boardIsSpaceEmpty } from "./board";

// Returns a promise that resolves when a player makes a move with the space of the player's move.
export default function playerMove(board, boardSprite) {

  return new Promise(resolve => {

    // Hook into the board's click event
    boardSprite.inputEnabled = true;
    boardSprite.events.onInputDown.add((sprite, pointer) => {

      // Convert the pointer to the local coordinates of the board sprite
      let point = boardSprite.game.input.getLocalPosition(boardSprite, pointer);

      // Determine the space the user clicked on.
      let row = Math.floor((point.y - sprite.top) * BOARD_SIZE / sprite.height);
      let column = Math.floor((point.x - sprite.left) * BOARD_SIZE / sprite.width);

      // Ignore the click if the space is already occupied
      if (!boardIsSpaceEmpty(board, row, column)) { return; }

      // Unregister the click handler. For now, we assume there are no other handlers.
      boardSprite.events.onInputDown.removeAll();

      // Resolve with the selected space
      resolve([ row, column ]);
    });
  });
}
