import _ from "lodash";

let game = new Phaser.Game(380, 720, Phaser.AUTO, '', { preload, create, update });

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
  let board = game.add.sprite(0, 0, 'board3');
  board.anchor.setTo(0.5, 0.5);
  board.position = game.world.bounds.size().multiply(0.5, 0.5);

  // Scale the board so it properly fits in the canvas
  let scale = game.world.bounds.width / board.width * 0.9;
  board.scale.setTo(scale, scale);
}

function update() {

}
