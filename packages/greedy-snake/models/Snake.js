import { getRandom } from '../utils.js';

export default class Snake {
  static UP = 0;
  static RIGHT = 1;
  static DOWN = 2;
  static LEFT = 3;

  constructor(gameState) {
    this.direction = Snake.RIGHT;
    this.previousDirection = null;

    this.speed = 50;
    /**
     * How to describe the snake.
     * Store the coordinates of each point from the head to the tail.
     * Originally, it is a rectangle, so there are four points. And its head is pointing to the
     * right. The order of the coordinates is anti-clockwise, so the coordinates
     * are: [right-top], [right-bottom], [left-bottom], [left-top].
     * Once the snake moves, it could go the the same direction, or take a turn.
     **/
    this.coordinates = [];

    this.totalLength = 80;
    this.mainLength = 80;
    this.crossLength = 0;

    this.width = 10;

    gameState.snake = this;

    this.gameState = gameState;
    this.setInitialCoordinates();
  }

  setInitialCoordinates() {
    const x = getRandom(this.gameState.stageWidth - this.totalLength);
    const y = getRandom(this.gameState.stageHeight);

    this.coordinates = [
      [x + this.totalLength, y],
      [x + this.totalLength, y + this.width],
      [x, y + this.width],
      [x, y],
    ];
  }

  move(timestamp) {
    const { lastPaintTimestamp } = this.gameState;
    if (!lastPaintTimestamp) {
      // first paint, use the initial coordinates
      this.gameState.lastPaintTimestamp = timestamp;
      return;
    }

    const distance = (this.speed * (timestamp - lastPaintTimestamp)) / 1000;
    return this.moveByDistance(distance);
  }

  moveByDistance(distance) {
    const { direction } = this;

    switch (direction) {
      case Snake.UP:
        this.moveUp(distance);
        break;
      case Snake.RIGHT:
        this.moveRight(distance);
        break;
      case Snake.DOWN:
        this.moveDown(distance);
        break;
      case Snake.LEFT:
      default:
        this.moveLeft(distance);
        break;
    }
  }

  moveUp(distance) {
    if (
      this.previousDirection === Snake.LEFT ||
      this.previousDirection === Snake.RIGHT
    ) {
      this.top -= distance;
      if (this.top < 0) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }

  moveRight(distance) {
    if (
      this.previousDirection === Snake.UP ||
      this.previousDirection === Snake.DOWN
    ) {
      this.left += distance;
      if (this.left > this.gameState.stageWidth) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }

  moveDown(distance) {
    if (
      this.previousDirection === Snake.LEFT ||
      this.previousDirection === Snake.RIGHT
    ) {
      this.top += distance;
      if (this.top > this.gameState.stageHeight) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }

  moveLeft(distance) {
    if (
      this.previousDirection === Snake.UP ||
      this.previousDirection === Snake.DOWN
    ) {
      this.left -= distance;
      if (this.left < 0) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }
}
