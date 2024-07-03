export const getMessage = (result: string) => {
  let message = "";
  if (result) {
    message = `GANADOR:${result}`;
  } else {
    message = "EMPATE";
  }
  return message;
};

export const initScene = (scene: Phaser.Scene) => {
  const overlay = scene.add.rectangle(
    0,
    0,
    scene.sys.game.canvas.width,
    scene.sys.game.canvas.height,
    0x000000,
    1
  );
  overlay.setOrigin(0, 0);

  scene.tweens.add({
    targets: overlay,
    alpha: { from: 1, to: 0 },
    duration: 1000,
  });
};
