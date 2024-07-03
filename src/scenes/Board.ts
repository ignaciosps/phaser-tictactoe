import Phaser from "phaser";
import { getMessage, initScene } from "../utils";

const initialCountdown = 10;
export default class Board extends Phaser.Scene {
  private currentPlayer!: "X" | "O";
  private board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  private tapSound!: Phaser.Sound.BaseSound;
  private WinSound!: Phaser.Sound.BaseSound;
  private turnsPlayed!: number;
  private timerEvent!: Phaser.Time.TimerEvent;
  private timerText!: Phaser.GameObjects.Text;
  private turnText!: Phaser.GameObjects.Text;
  private countdown!: number;
  constructor() {
    super("Board");
  }

  preload() {
    this.load.image("Board", "assets/Board.png");
    this.load.image("X", "assets/X.png");
    this.load.image("O", "assets/O.png");
    this.load.image("Particle", "assets/Particle.png");
    this.load.audio("Tap", "assets/Tap.mp3");
    this.load.audio("Win", "assets/Win.mp3");
  }

  create() {
    initScene(this);
    this.clearBoard();
    this.turnsPlayed = 0;

    this.currentPlayer = "X";

    this.tapSound = this.sound.add("Tap");
    this.WinSound = this.sound.add("Win");

    this.add.image(400, 300, "Board");
    this.input.on("pointerdown", this.handlePointerDown, this);

    this.timerText = this.add
      .text(5, 10, `Tiempo:${initialCountdown}`, {
        fontSize: "24px",
        color: "#000000",
      })
      .setOrigin(0, 0);

    this.turnText = this.add
      .text(5, 40, `Turno:${this.currentPlayer}`, {
        fontSize: "24px",
        color: "#000000",
      })
      .setOrigin(0, 0);

    this.startTimer(this);
  }

  startTimer(scene: Phaser.Scene) {
    if (this.timerEvent) {
      this.timerEvent.remove();
    }
    this.countdown = initialCountdown;
    this.timerText.setText(`Tiempo:${this.countdown}`);
    this.turnText.setText(`Turno:${this.currentPlayer}`);

    this.timerEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => this.updateTimer(scene),
      callbackScope: scene,
      loop: true,
    });
  }

  updateTimer(scene: Phaser.Scene) {
    this.countdown--;
    this.timerText.setText(`Tiempo:${this.countdown}`);

    if (this.countdown <= 0) {
      this.winGame(scene, this.currentPlayer === "X" ? "O" : "X");
    }
  }

  handlePointerDown(pointer: PointerEvent) {
    const x = pointer.x;
    const y = pointer.y;

    const col = Math.floor((x - 100) / 200);
    const row = Math.floor(y / 200);

    if (col >= 0 && col < 3 && row >= 0 && row < 3) {
      if (this.board[row][col] === "") {
        this.turnsPlayed += 1;
        this.board[row][col] = this.currentPlayer;
        this.drawSymbol(this, row, col);
        if (this.checkWin(row, col)) {
          this.winGame(this, this.currentPlayer);
        } else {
          if (this.turnsPlayed >= 9) {
            this.finishGame(this, "");
          } else {
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            this.startTimer(this);
          }
        }
      }
    }
  }

  drawSymbol(scene: this, row: number, col: number) {
    const x = 200 + col * 200;
    const y = 100 + row * 200;

    const imageToAnimate = scene.add
      .image(x, y, this.currentPlayer)
      .setScale(0.5)
      .setOrigin(0.5)
      .setAlpha(0);

    scene.tweens.add({
      targets: imageToAnimate,
      duration: 500,
      ease: "Power1",
      alpha: 1,
    });
    this.tapSound.play();
  }

  checkWin(row: number, col: number) {
    const symbol = this.board[row][col];

    // Comprobar fila
    if (
      this.board[row][0] === symbol &&
      this.board[row][1] === symbol &&
      this.board[row][2] === symbol
    ) {
      return true;
    }

    // Comprobar columna
    if (
      this.board[0][col] === symbol &&
      this.board[1][col] === symbol &&
      this.board[2][col] === symbol
    ) {
      return true;
    }

    // Comprobar diagonal principal
    if (
      this.board[0][0] === symbol &&
      this.board[1][1] === symbol &&
      this.board[2][2] === symbol
    ) {
      return true;
    }

    // Comprobar diagonal secundaria
    if (
      this.board[0][2] === symbol &&
      this.board[1][1] === symbol &&
      this.board[2][0] === symbol
    ) {
      return true;
    }

    return false;
  }

  clearBoard() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  drawMessage(scene: Phaser.Scene, result: string) {
    const showTextWin = scene.add
      .text(400, 300, getMessage(result), {
        fontSize: "96px",
        fontStyle: "600",
        color: "#3f51b5",
        backgroundColor: "#cccccc",
        padding: {
          x: 20,
          y: 10,
        },
      })
      .setOrigin(0.5)
      .setAlpha(0);

    scene.tweens.add({
      targets: showTextWin,
      alpha: 1,
      duration: 300,
    });
  }

  winGame(scene: Phaser.Scene, result: string) {
    this.WinSound.stop();
    this.WinSound.play();
    scene.add
      .particles(400, 450, "Particle", {
        lifespan: 5000,
        angle: { min: -45, max: -135 },
        speed: 1500,
        frequency: 150,
        gravityY: 800,
      })
      .setScale(0.3);
    this.finishGame(this, result);
  }

  finishGame(scene: Phaser.Scene, result: string) {
    scene.input.off("pointerdown", this.handlePointerDown);
    this.timerEvent.remove(false);
    this.drawMessage(scene, result);
    scene.time.delayedCall(
      result ? 5000 : 3000,
      () => {
        scene.scene.stop("Board");
        scene.scene.start("GameOver", { result: result });
      },
      [],
      scene
    );
  }
}
