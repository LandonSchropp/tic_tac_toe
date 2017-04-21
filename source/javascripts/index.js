import _ from "lodash";

let game = new Phaser.Game(380, 720, Phaser.AUTO, '', { preload, create });

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
  let boardSprite = game.add.sprite(0, 0, 'board3');
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
  let { x, y, width, height } = sprite.getBounds();

  let row = Math.floor((pointer.y - y) * 3 / height);
  let column = Math.floor((pointer.x - x) * 3 / width);
}
