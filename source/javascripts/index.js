import _ from "lodash";

import Board from "./board";
import Opponent from "./opponent";
import Player from "./player";

let board, boardSprite, player, opponent, playerScoreText, opponentScoreText;

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

  // Set up the game board
  board = new Board(5);

  // Add the board sprite
  boardSprite = game.add.sprite(0, 0, `board${ board.size }`);
  boardSprite.anchor.setTo(0.5, 0.5);
  boardSprite.position.setTo(game.world.centerX, game.world.centerY);

  // Scale the board so it properly fits in the canvas
  let scale = game.world.bounds.width / boardSprite.width * 0.9;
  boardSprite.scale.setTo(scale, scale);

  // Set up the players
  player = new Player(board, boardSprite, "x");
  opponent = new Opponent(board);

  // Set up the scores

  // Add the
  let scoreStyle = { fontSize: '32px', fill: '#979797' };
  let textBounds = [ 16, 16, game.world.width - 32, game.world.height - 32 ];

  playerScoreText = game.add.text(0, 0, '0', {
    ...scoreStyle,
    boundsAlignH: 'left',
    boundsAlignV: 'top'
  });

  opponentScoreText = game.add.text(0, 0, '0', {
    ...scoreStyle,
    boundsAlignH: 'right',
    boundsAlignV: 'bottom'
  });

  playerScoreText.setTextBounds(...textBounds);
  opponentScoreText.setTextBounds(...textBounds);

  // Kick off the game
  nextMove(player);
}

// Loops the game, letting each player go in sequence
function nextMove(currentPlayer) {

  // Kick off the move
  currentPlayer.move((row, column, mark) => {

    // Add the mark to the board
    addMark(row, column, mark);

    // Update the player's score
    updateScore(mark);

    // TODO: Check if the game is over

    // Triggler the next move
    nextMove(currentPlayer === player ? opponent : player);
  })
}

// Add a mark to the board as well as the sprite
function addMark(row, column, mark) {
  board.set(row, column, mark);
  let x = boardSprite.width / board.size * column + boardSprite.left;
  let y = boardSprite.height / board.size * row + boardSprite.top;
  let sprite = game.add.sprite(x, y, mark);
  sprite.scale = boardSprite.scale;
}

function updateScore(mark) {
  let text = { x: playerScoreText, o: opponentScoreText }[mark];
  text.text = board.score(mark).toString();
}
