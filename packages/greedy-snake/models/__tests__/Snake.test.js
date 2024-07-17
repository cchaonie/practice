import { describe, it, expect, beforeEach } from 'vitest';
import Snake from '../Snake';
import GameState from '../GameState';
import LinkedNode from '../LinkedNode';

describe('Snake', () => {
  let gameState;
  const now = 1_000_000_000_000;

  beforeEach(() => {
    gameState = new GameState(1024, 960);
  });

  it('should render correctly when update once', () => {
    const snake = new Snake(gameState);

    snake.head = { left: [100, 100] };

    snake.update(now + 1000);

    const state0 = new LinkedNode({
      timestamp: now + 1000,
      direction: Snake.RIGHT,
    });
    const bodyLengthInDirections0 = new LinkedNode({
      length: 80,
      direction: Snake.RIGHT,
    });

    expect(snake.paintStates).toEqual(state0);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections0);
    expect(snake.head).toEqual({ left: [100, 100] });
    expect(snake.coordinates).toEqual([[20, 100, 80, 10]]);
  });

  it('should render correctly when update twice', () => {
    const snake = new Snake(gameState);

    snake.head = { left: [100, 100] };

    snake.update(now + 1000);
    snake.update(now + 2000);

    const state0 = new LinkedNode({
      timestamp: now + 1000,
      direction: Snake.RIGHT,
    });
    const state1 = new LinkedNode({
      timestamp: now + 2000,
      direction: Snake.RIGHT,
    });
    state1.next = state0;

    const bodyLengthInDirections0 = new LinkedNode({
      length: 80,
      direction: Snake.RIGHT,
    });

    expect(snake.paintStates).toEqual(state1);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections0);
    expect(snake.head).toEqual({ left: [150, 100] });
    expect(snake.coordinates).toEqual([[70, 100, 80, 10]]);
  });

  it('should render correctly when update three times', () => {
    const snake = new Snake(gameState);

    snake.head = { left: [100, 100] };

    snake.update(now + 1000);
    snake.update(now + 2000);

    snake.direction = Snake.DOWN;
    snake.update(now + 3000);

    const state0 = new LinkedNode({
      timestamp: now + 1000,
      direction: Snake.RIGHT,
    });
    const state1 = new LinkedNode({
      timestamp: now + 2000,
      direction: Snake.RIGHT,
    });
    const state2 = new LinkedNode({
      timestamp: now + 3000,
      direction: Snake.DOWN,
    });
    state2.next = state1;
    state1.next = state0;

    const bodyLengthInDirections0 = new LinkedNode({
      length: 80,
      direction: Snake.RIGHT,
    });
    expect(snake.paintStates).toEqual(state2);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections0);
    expect(snake.head).toEqual({ left: [200, 100 + snake.width] });
  });

  it('should render correctly when update four times', () => {
    const snake = new Snake(gameState);

    snake.head = { left: [100, 100] };

    snake.update(now + 1000);
    snake.update(now + 2000);

    snake.direction = Snake.DOWN;
    snake.update(now + 3000);

    snake.update(now + 4000);

    const state0 = new LinkedNode({
      timestamp: now + 1000,
      direction: Snake.RIGHT,
    });
    const state1 = new LinkedNode({
      timestamp: now + 2000,
      direction: Snake.RIGHT,
    });
    const state2 = new LinkedNode({
      timestamp: now + 3000,
      direction: Snake.DOWN,
    });
    const state3 = new LinkedNode({
      timestamp: now + 4000,
      direction: Snake.DOWN,
    });
    state3.next = state2;
    state2.next = state1;
    state1.next = state0;

    const bodyLengthInDirections0 = new LinkedNode({
      length: 50,
      direction: Snake.DOWN,
    });
    const bodyLengthInDirections1 = new LinkedNode({
      length: 30,
      direction: Snake.RIGHT,
    });

    bodyLengthInDirections0.next = bodyLengthInDirections1;

    expect(snake.paintStates).toEqual(state3);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections0);
    expect(snake.head).toEqual({ left: [200, 160] });
  });

  it('should render correctly when update five times', () => {
    const snake = new Snake(gameState);

    snake.head = { left: [100, 100] };

    snake.update(now + 1000); // [100, 100]
    snake.update(now + 2000); // [150, 100]

    snake.direction = Snake.DOWN;
    snake.update(now + 3000); // [200, 110]

    snake.direction = Snake.LEFT;
    snake.update(now + 4000); // [190, 160]

    snake.update(now + 5000); // [140, 160]

    const state0 = new LinkedNode({
      timestamp: now + 1000,
      direction: Snake.RIGHT,
    });
    const state1 = new LinkedNode({
      timestamp: now + 2000,
      direction: Snake.RIGHT,
    });
    const state2 = new LinkedNode({
      timestamp: now + 3000,
      direction: Snake.DOWN,
    });
    const state3 = new LinkedNode({
      timestamp: now + 4000,
      direction: Snake.LEFT,
    });
    const state4 = new LinkedNode({
      timestamp: now + 5000,
      direction: Snake.LEFT,
    });
    state4.next = state3;
    state3.next = state2;
    state2.next = state1;
    state1.next = state0;

    const bodyLengthInDirections0 = new LinkedNode({
      length: 50,
      direction: Snake.LEFT,
    });
    const bodyLengthInDirections1 = new LinkedNode({
      length: 30,
      direction: Snake.DOWN,
    });

    bodyLengthInDirections0.next = bodyLengthInDirections1;

    expect(snake.paintStates).toEqual(state4);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections0);
    expect(snake.head).toEqual({ left: [140, 160] });
  });
});
