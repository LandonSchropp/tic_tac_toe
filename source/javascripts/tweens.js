export function appearTween(game, sprite) {
  let originalScale = sprite.scale;

  sprite.scale = new Phaser.Point(0, 0);
  sprite.angle = -180;

  let growPromise = new Promise(resolve => {
    game.add.tween(sprite)
      .to({ angle: 0 }, 300, Phaser.Easing.Cubic.InOut, true)
      .onComplete.add(resolve);
  });

  let rotatePromise = new Promise(resolve => {
    game.add.tween(sprite.scale)
      .to(originalScale, 300, Phaser.Easing.Cubic.InOut, true)
      .onComplete.add(resolve);
  });

  return Promise.all([ growPromise, rotatePromise ]);
}
