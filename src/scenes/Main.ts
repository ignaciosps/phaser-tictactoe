import Phaser from "phaser";
import { initScene } from "../utils";

export default class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }
  preload() {}
  create() {
    initScene(this);

    this.add
      .text(400, 100, "Tic Tac Toe", {
        fontSize: "96px",
        fontStyle: "600",
        color: "black",
      })
      .setOrigin(0.5);

    const playImg = this.add.image(400, 350, "Play").setScale(0.3);
    playImg.setInteractive();

    this.tweens.add({
      targets: playImg,
      scale: 0.4,
      duration: 500,
      ease: "Power1",
      yoyo: true,
      repeat: -1,
    });
    playImg.on("pointerdown", () => {
      this.scene.stop("Main");
      this.scene.start("Menu");
    });
  }
  update() {}
}
