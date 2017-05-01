import _ from "lodash";

import Board from "./board";
import Opponent from "./opponent";
import Player from "./player";
import palettes from "./palettes";

import { appearTween, gameOverTween, colorTween } from './tweens';

let board, boardSprite, player, opponent, markSprites, palette, spaceKey;

let game = new Phaser.Game(380, 720, Phaser.AUTO, '', { preload, create });

function preload() {
  game.load.image('board', '/images/board.png');
  game.load.image('x', '/images/x.png');
  game.load.image('o', '/images/o.png');
}

function create() {

  // Set the game background color
  palette = palettes.nextPalette();
  game.stage.backgroundColor = palette.background;

  // Add the board sprite
  boardSprite = game.add.sprite(0, 0, 'board');
  boardSprite.anchor.setTo(0.5, 0.5);
  boardSprite.position.setTo(game.world.centerX, game.world.centerY);

  boardSprite.tint = palette.board;

  // Scale the board so it properly fits in the canvas
  let scale = game.world.bounds.width / boardSprite.width * 0.9;
  boardSprite.scale.set(scale);

  // Register the space key
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
  spaceKey.onUp.add(() => {
    palette = palettes.nextPalette();
    colorTween(game, boardSprite, _.flatten(markSprites), palette);
  });

  // Kick off the game
  reset();
}

function reset() {

  // Set up the game logic objects
  board = new Board();
  player = new Player(board, boardSprite, "x");
  opponent = new Opponent(board);

  // Set up the container for the marks
  markSprites = _.times(board.size, () => []);

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
      if (board.isGameOver()) { return gameOver(); }

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
  markSprites[row][column] = sprite;

  sprite.scale = boardSprite.scale.clone();
  sprite.anchor.set(0.5);
  sprite.tint = palette.mark;

  // Tween the sprite
  return appearTween(game, sprite);
}

// Called when the game has ended.
function gameOver() {

  let winnerCoordinates = board.winnerCoordinates();

  let loserCoordinates = board.spaces().filter(coordinates => {
    return !_.some(winnerCoordinates, _.partial(_.isEqual, coordinates));
  });

  function mapCoordinatesToSprites(coordinates) {
    return _( coordinates )
      .map(([ row, column ]) => markSprites[row][column])
      .compact()
      .value();
  }

  let winnerSprites = mapCoordinatesToSprites(winnerCoordinates);
  let loserSprites = mapCoordinatesToSprites(loserCoordinates);

  gameOverTween(game, winnerSprites, loserSprites, palette).then(reset);
}
