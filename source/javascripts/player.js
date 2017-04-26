export default class Player {

  constructor(board, boardSprite, mark) {
    this.board = board;
    this.boardSprite = boardSprite;
    this.mark = mark;
  }

  // Starts a move. In the case of a player, this means attaching a listener to the sprite for a
  // click and resolving the returned promise when the player has clicked on the board.
  move() {

    return new Promise(resolve => {

      // Hook into the board's click event
      this.boardSprite.inputEnabled = true;
      this.boardSprite.events.onInputDown.add((sprite, pointer) => {

        // Determine the row and column the user clicked on.
        let row = Math.floor((pointer.y - sprite.top) * this.board.size / sprite.height);
        let column = Math.floor((pointer.x - sprite.left) * this.board.size / sprite.width);

        // Ignore the click if the space is already occupied
        if (!this.board.isSpaceEmpty(row, column)) { return; }

        // Unregister the click handler. For now, we assume there are no other handlers.
        this.boardSprite.events.onInputDown.removeAll();

        // Make the move
        resolve([ row, column ]);
      });
    });
  }
}
