import Phaser from "phaser";
import { initScene } from "../utils";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {}

  create() {
    initScene(this);

    this.add
      .text(400, 150, "Elegir Jugador", {
        fontSize: "48px",
        fontStyle: "600",
        color: "#000000",
        padding: {
          x: 20,
          y: 10,
        },
      })
      .setOrigin(0.5);
    const xPlayer = this.add.image(300, 300, "X").setScale(0.5);
    const oPlayer = this.add.image(500, 300, "O").setScale(0.5);
    xPlayer.setInteractive();
    oPlayer.setInteractive();

    this.tweens.add({
      targets: xPlayer,
      scale: 0.4,
      duration: 500,
      ease: "Power1",
      yoyo: true,
      repeat: -1,
    });
    this.tweens.add({
      targets: oPlayer,
      scale: 0.4,
      duration: 500,
      ease: "Power1",
      yoyo: true,
      repeat: -1,
    });
    xPlayer.on("pointerdown", () => this.initGame(this, "X"));
    oPlayer.on("pointerdown", () => this.initGame(this, "O"));
  }

  initGame(scene: Phaser.Scene, player: "X" | "O") {
    scene.scene.stop("Menu");
    scene.scene.start("Board", { player: player });
  }
}
