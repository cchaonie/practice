export default class Snake {
  static UP = 0;
  static RIGHT = 1;
  static DOWN = 2;
  static LEFT = 3;

  constructor(gameState) {
    this.direction = Snake.UP;
    this.previousDirection = null;
    this.speed = 50;
    this.left = 0;
    this.top = 0;
    this.totalLength = 80;
    this.mainLength = 80;
    this.crossLength = 0;
    this.width = 10;

    gameState.snake = this;

    this.gameState = gameState;
  }

  get distancePerFrame() {
    return (16.6 * this.speed) / 1000;
  }

  init() {
    this.left =
      Math.floor(
        Math.random() * (this.gameState.stageWidth - this.totalLength)
      ) + this.totalLength;

    this.top = Math.floor(Math.random() * this.gameState.stageHeight);
  }

  turn(direction) {
    const allowTurns = [
      [Snake.LEFT, Snake.RIGHT],
      [Snake.UP, Snake.DOWN],
      [Snake.LEFT, Snake.RIGHT],
      [Snake.UP, Snake.DOWN],
    ];

    const turns = allowTurns[this.direction];
    if (turns.includes(direction)) {
      this.previousDirection = this.direction;
      this.direction = direction;
      this.mainLength = 0;
      this.crossLength = this.totalLength;
    }
  }
}
