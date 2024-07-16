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

  it('should update bodyLengthInDirections correctly', () => {
    const snake = new Snake(gameState);

    snake.head = { left: [100, 100] };

    snake.update(now + 1000);

    expect(snake.head).toEqual({ left: [100, 100] });
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

    snake.update(now + 2000);
    const state1 = new LinkedNode({
      timestamp: now + 2000,
      direction: Snake.RIGHT,
    });
    state1.next = state0;
    const bodyLengthInDirections1 = new LinkedNode({
      length: 80,
      direction: Snake.RIGHT,
    });
    expect(snake.paintStates).toEqual(state1);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections1);
    expect(snake.head).toEqual({ left: [150, 100] });

    snake.direction = Snake.DOWN;

    snake.update(now + 3000);
    const state2 = new LinkedNode({
      timestamp: now + 3000,
      direction: Snake.DOWN,
    });
    state2.next = state1;

    const bodyLengthInDirections2 = new LinkedNode({
      length: 80,
      direction: Snake.RIGHT,
    });
    expect(snake.paintStates).toEqual(state2);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections2);
    expect(snake.head).toEqual({ left: [200, 110] });

    snake.update(now + 4000);
    const state3 = new LinkedNode({
      timestamp: now + 4000,
      direction: Snake.DOWN,
    });
    state3.next = state2;

    const bodyLengthInDirections3 = new LinkedNode({
      length: 30,
      direction: Snake.RIGHT,
    });
    const bodyLengthInDirections4 = new LinkedNode({
      length: 50,
      direction: Snake.DOWN,
    });
    bodyLengthInDirections4.next = bodyLengthInDirections3;

    expect(snake.paintStates).toEqual(state3);
    expect(snake.bodyLengthInDirections).toEqual(bodyLengthInDirections4);
    expect(snake.head).toEqual({ left: [200, 160] });
  });
});
