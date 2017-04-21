import _ from "lodash";

import Board from "./board";

let boardSprite;

let game = new Phaser.Game(380, 720, Phaser.AUTO, '', { preload, create });
let board = new Board(3);

function preload() {

  // Load the images
  let images = {
    board3: "board3.png",
    board4: "board4.png",
    board5: "board5.png",
    o: "o.png",
    x: "x.png"
  };

  _.forEach(images, (path, key) => game.load.image(key, `/images/${ path }`));
}

function create() {

  // Add the board
  boardSprite = game.add.sprite(0, 0, 'board3');
  boardSprite.anchor.setTo(0.5, 0.5);
  boardSprite.position = game.world.bounds.size().multiply(0.5, 0.5);

  // Scale the board so it properly fits in the canvas
  let scale = game.world.bounds.width / boardSprite.width * 0.9;
  boardSprite.scale.setTo(scale, scale);

  // Listen to clicks on the sprite
  boardSprite.inputEnabled = true;
  boardSprite.events.onInputDown.add(onBoardClick, this);
}

function onBoardClick(sprite, pointer) {

  // Determine the row and column the user clicked on.
  let row = Math.floor((pointer.y - sprite.top) * board.size / sprite.height);
  let column = Math.floor((pointer.x - sprite.left) * board.size / sprite.width);

  // Ignore the click if the space is already occupied
  if (!board.isSpaceEmpty(row, column)) { return; }

  // Add the mark
  addMark(row, column, "x");
}

function addMark(row, column, mark) {
  board.set(row, column, mark);
  let x = boardSprite.width / board.size * column + boardSprite.left;
  let y = boardSprite.height / board.size * row + boardSprite.top;
  let sprite = game.add.sprite(x, y, mark);
  sprite.scale = boardSprite.scale;
}
