import { getRandom } from '../utils/index.js';
import LinkedNode from './LinkedNode.js';

export default class Snake {
  static UP = 0;
  static RIGHT = 1;
  static DOWN = 2;
  static LEFT = 3;

  constructor(gameState) {
    this.direction = Snake.RIGHT;

    this.speed = 50;

    this.head = null;
    this.paintStates = null;
    this.bodyLengthInDirections = null;
    this.coordinates = [];

    this.totalLength = 80;
    this.width = 10;

    gameState.snake = this;

    this.gameState = gameState;
    this.setInitialHeadCoordinates();
  }

  setInitialHeadCoordinates() {
    const x = getRandom(this.gameState.stageWidth - this.totalLength);
    const y = getRandom(this.gameState.stageHeight);

    this.head = {
      left: [x + this.totalLength, y],
      right: [x + this.totalLength, y + this.width],
    };
  }

  /**
   * Record all of the states of the snake when repaints, so there will be 60 nodes per
   * second. We need to think of a way to improve it, we should only record the states
   * that can cover the whole length of the snake.
   * @param {*} timestamp
   * @returns
   */
  update(timestamp) {
    const currentState = new LinkedNode({
      timestamp,
      direction: this.direction,
    });
    currentState.next = this.paintStates;
    this.paintStates = currentState;

    this.updateBodyLengthInDirections();
  }

  /**
   * {timestamp: 6, direction: TOP} ->
   * {timestamp: 5, direction: TOP} ->
   * {timestamp: 4, direction: TOP} ->
   * {timestamp: 3, direction: Right} ->
   * {timestamp: 2, direction: Right} ->
   * {timestamp: 1, direction: Right}
   */
  updateBodyLengthInDirections() {
    this.bodyLengthInDirections = null;

    let currentState = this.paintStates;
    // The first paint
    if (!currentState.next) {
      const bodyLengthInCurrentDirection = new LinkedNode({
        length: this.totalLength,
        direction: currentState.data.direction,
      });

      this.bodyLengthInDirections = bodyLengthInCurrentDirection;
    }

    while (currentState.next) {
      let nextTurningPoint = currentState.next;
      while (
        nextTurningPoint.next &&
        nextTurningPoint.direction === currentState.direction
      ) {
        nextTurningPoint = nextTurningPoint.next;
      }

      const deltaTime = nextTurningPoint.timestamp - currentState.timestamp;
      const distance = (deltaTime / 1000) * this.speed;

      if (!this.bodyLengthInDirections) {
        const bodyLengthInCurrentDirection = new LinkedNode({
          length: Math.min(this.totalLength, distance),
          direction: currentState.direction,
        });
        this.bodyLengthInDirections = bodyLengthInCurrentDirection;
        this.updateHeadCoordinates(distance, currentState.direction);
      } else {
        const lastBodyLengthInDirection = this.bodyLengthInDirections;
        lastBodyLengthInDirection.data.length =
          distance + lastBodyLengthInDirection.data.length > this.totalLength
            ? this.totalLength
            : lastBodyLengthInDirection.data.length + distance;
        this.updateHeadCoordinates(distance, currentState.direction);

        if (nextTurningPoint.direction !== currentState.direction) {
          const bodyLengthInCurrentDirection = new LinkedNode({
            length: 0,
            direction: nextTurningPoint.direction,
          });
          bodyLengthInCurrentDirection.next = this.bodyLengthInDirections;
          this.bodyLengthInDirections = bodyLengthInCurrentDirection;
        }
      }

      currentState = nextTurningPoint;
    }
    this.display();
  }

  /**
   * Fix the logic to include the previous and the width of the snake
   * @param {*} distance
   * @param {*} direction
   */
  updateHeadCoordinates(distance, direction) {
    const head = this.head;
    switch (direction) {
      case Snake.UP:
        this.head = {
          left: [head.left[0], head.left[1] - distance],
          right: [head.right[0], head.right[1] - distance],
        };
        break;
      case Snake.RIGHT:
        this.head = {
          left: [head.left[0] + distance, head.left[1]],
          right: [head.right[0] + distance, head.right[1]],
        };
        break;
      case Snake.DOWN:
        this.head = {
          left: [head.left[0], head.left[1] + distance],
          right: [head.right[0], head.right[1] + distance],
        };
        break;
      case Snake.LEFT:
        this.head = {
          left: [head.left[0] - distance, head.left[1]],
          right: [head.right[0] - distance, head.right[1]],
        };
        break;
    }
  }

  grow() {
    this.totalLength += 10;
  }

  /**
   * how to show it on the screen
   * TODO implement this method
   */
  display() {
    const currentLengthInDirection = this.bodyLengthInDirections;
    const head = this.head;
    if (!currentLengthInDirection.next) {
      const length = currentLengthInDirection.data.length;
      switch (currentLengthInDirection.data.direction) {
        case Snake.UP:
          this.coordinates = [
            this.head.left,
            this.head.right,
            [head.right[0], head.right[1] + length],
            [head.left[0], head.left[1] + length],
          ];
          break;
        case Snake.RIGHT:
          this.coordinates = [
            this.head.left,
            this.head.right,
            [head.right[0] - length, head.right[1]],
            [head.left[0] - length, head.left[1]],
          ];
          break;
        case Snake.DOWN:
          this.coordinates = [
            this.head.left,
            this.head.right,
            [head.right[0], head.right[1] - length],
            [head.left[0], head.left[1] - length],
          ];
          break;
        case Snake.LEFT:
          this.coordinates = [
            this.head.left,
            this.head.right,
            [head.right[0] + length, head.right[1]],
            [head.left[0] + length, head.left[1]],
          ];
          break;
      }
    } else {
      // TODO
    }
  }
}
