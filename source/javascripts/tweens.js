import _ from 'lodash';

function color(game, object, property, color, delay = 0) {
  return new Promise(resolve => {
    let startColor = object[property];
    let interpolator = { step: 0 };

    let tween = game.add.tween(interpolator)
      .to({ step: 100 }, 300, Phaser.Easing.Cubic.InOut, true, delay);

    tween.onUpdateCallback(() => {
      object[property] = Phaser.Color.interpolateColor(startColor, color, 100, interpolator.step);
    });

    tween.onComplete.add(resolve);
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

export function gameOverTween(game, boardSprite, winnerSprites, loserSprites, palette) {
  let sprites = _.concat(winnerSprites, loserSprites);

  return Promise.all(_.concat(
    loserSprites.map(sprite => color(game, sprite, "tint", boardSprite.tint)),
    sprites.map(sprite => fadeOut(game, sprite, 2000)),
    sprites.map(sprite => shrink(game, sprite, 2000)),
    sprites.map(sprite => rotateOut(game, sprite, 2000)),
    paletteTween(game, boardSprite, _.concat(winnerSprites, loserSprites), palette, 2200)
  ));
}

export function paletteTween(game, boardSprite, markSprites, palette, delay = 0) {

  return Promise.all([
    color(game, game.stage, "backgroundColor", palette.background, delay),
    color(game, boardSprite, "tint", palette.board, delay),
    ...markSprites.map(markSprite => color(game, markSprite, "tint", palette.mark, delay))
  ]);
}
