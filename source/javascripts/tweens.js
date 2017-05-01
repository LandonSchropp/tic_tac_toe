import _ from 'lodash';

function tint(game, sprite, tint) {
  return new Promise(resolve => {
    let startTint = sprite.tint;
    let interpolator = { step: 0 };

    let tintTween = game.add.tween(interpolator)
      .to({ step: 100 }, 300, Phaser.Easing.Cubic.InOut, true);

    tintTween.onUpdateCallback(() => {
      sprite.tint = Phaser.Color.interpolateColor(startTint, tint, 100, interpolator.step);
    });

    tintTween.onComplete.add(resolve);
  });
}

function fadeIn(game, sprite) {
  sprite.alpha = 0;

  return new Promise(resolve => {
    game.add.tween(sprite)
      .to({ alpha: 1 }, 300, Phaser.Easing.Cubic.InOut, true)
      .onComplete.add(resolve);
  });
}

function grow(game, sprite) {
  let originalScale = sprite.scale;
  sprite.scale = new Phaser.Point(0, 0);

  return new Promise(resolve => {
    game.add.tween(sprite.scale)
      .to(originalScale, 300, Phaser.Easing.Cubic.InOut, true)
      .onComplete.add(resolve);
  });
}

function shrink(game, sprite, delay) {
  return new Promise(resolve => {
    game.add.tween(sprite.scale)
      .to(new Phaser.Point(0, 0), 300, Phaser.Easing.Cubic.InOut, true, delay)
      .onComplete.add(resolve);
  });
}

function rotateIn(game, sprite) {
  sprite.angle = -180;

  return new Promise(resolve => {
    game.add.tween(sprite)
      .to({ angle: 0 }, 300, Phaser.Easing.Cubic.InOut, true)
      .onComplete.add(resolve);
  });
}

function rotateOut(game, sprite, delay) {
  sprite.angle = 0;

  return new Promise(resolve => {
    game.add.tween(sprite)
      .to({ angle: -180 }, 300, Phaser.Easing.Cubic.InOut, true, delay)
      .onComplete.add(resolve);
  });
}

function fadeOut(game, sprite, delay) {
  sprite.alpha = 1;

  return new Promise(resolve => {
    game.add.tween(sprite)
      .to({ alpha: 0 }, 300, Phaser.Easing.Cubic.InOut, true, delay)
      .onComplete.add(resolve);
  });
}

export function appearTween(game, sprite) {
  return Promise.all([ fadeIn(game, sprite), grow(game, sprite), rotateIn(game, sprite) ]);
}

export function gameOverTween(game, winnerSprites, loserSprites, colors) {
  let sprites = _.concat(winnerSprites, loserSprites);

  return Promise.all(_.concat(
    loserSprites.map(sprite => tint(game, sprite, colors.board)),
    sprites.map(sprite => fadeOut(game, sprite, 2000)),
    sprites.map(sprite => shrink(game, sprite, 2000)),
    sprites.map(sprite => rotateOut(game, sprite, 2000))
  ));
}

export function colorTween(game, boardSprite, markSprites, palette) {

  return new Promise(resolve => {
    game.stage.backgroundColor = palette.background;
    boardSprite.tint = palette.board;
    markSprites.forEach(markSprite => markSprite.tint = palette.mark);
    resolve();
  });
}
