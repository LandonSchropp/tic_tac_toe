import _ from "lodash";
import async from "async";

import Board from "./board";
import Opponent from "./opponent";
import Player from "./player";
import colors from "./colors";

import { appearTween } from './tweens';

let palette = _.last(colors);

let board, boardSprite, player, opponent, playerScoreText, opponentScoreText;

let game = new Phaser.Game(380, 720, Phaser.AUTO, '', { preload, create });

function preload() {
  game.load.image('board', '/images/board.png');
  game.load.image('x', '/images/x.png');
  game.load.image('o', '/images/o.png');
}

function create() {

  // Set the game background color
  game.stage.backgroundColor = palette.background;

  // Set up the game board
  board = new Board();

  // Add the board sprite
  boardSprite = game.add.sprite(0, 0, 'board');
  boardSprite.anchor.setTo(0.5, 0.5);
  boardSprite.position.setTo(game.world.centerX, game.world.centerY);
  boardSprite.tint = palette.board;

  // Scale the board so it properly fits in the canvas
  let scale = game.world.bounds.width / boardSprite.width * 0.9;
  boardSprite.scale.set(scale);

  // Set up the players
  player = new Player(board, boardSprite, "x");
  opponent = new Opponent(board);

  // Kick off the game
  nextMove(player);
}

// Loops the game, letting each player go in sequence
function nextMove(currentPlayer) {

  // Kick off the move
  currentPlayer.move().then(([ row, column ]) => {

    // Add the mark to the board
    addMark(row, column, currentPlayer.mark).then(() => {

      // TODO: Check if the game is over

      // Triggler the next move
      nextMove(currentPlayer === player ? opponent : player);
    });
  })
}

// Add a mark to the board as well as the sprite
function addMark(row, column, mark) {

  // Update the board
  board.set(row, column, mark);

  // Add the sprite
  let x = boardSprite.width / board.size * (column + 0.5) + boardSprite.left;
  let y = boardSprite.height / board.size * (row + 0.5) + boardSprite.top;

  let sprite = game.add.sprite(x, y, mark);

  sprite.scale = boardSprite.scale.clone();
  sprite.anchor.set(0.5);
  sprite.tint = palette[mark === 'x' ? 'player' : 'opponent'];

  // Tween the sprite
  return appearTween(game, sprite);
}
