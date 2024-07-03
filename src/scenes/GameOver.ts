import Phaser from "phaser";
import { getMessage, initScene } from "../utils";

export default class GameOver extends Phaser.Scene {
  private result: string = "";
  constructor() {
    super("GameOver");
  }

  init(data: any) {
    this.result = data.result;
  }

  preload() {
    this.load.image("Reload", "assets/Reload.png");
  }

  create() {
    initScene(this);

    this.add
      .text(400, 200, getMessage(this.result), {
        fontSize: "96px",
        fontStyle: "600",
        color: "black",
      })
      .setOrigin(0.5);

    const reloadImg = this.add.image(400, 350, "Reload").setScale(0.1);
    reloadImg.setInteractive();
    this.tweens.add({
      targets: reloadImg,
      scale: 0.2,
      duration: 500,
      ease: "Power1",
      yoyo: true,
      repeat: -1,
    });

    const reloadText = this.add
      .text(400, 450, "Volver a jugar", {
        fontSize: "48px",
        color: "black",
        fontStyle: "600",
      })
      .setOrigin(0.5);
    reloadText.setInteractive();

    reloadImg.on("pointerdown", () => this.playAgain(this));
    reloadText.on("pointerdown", () => this.playAgain(this));
  }
  update() {}

  playAgain(scene: Phaser.Scene) {
    scene.scene.stop("GameOver");
    scene.scene.run("Board");
  }
}
