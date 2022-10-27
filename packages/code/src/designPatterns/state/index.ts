import { State, Init, Running, Paused, Stopped } from './types';

class Game {
  #currentState: State;
  constructor() {
    this.#currentState = new Init();
  }

  run() {
    this.#currentState = new Running();
  }

  resume() {
    this.#currentState = new Running();
  }

  pause() {
    this.#currentState = new Paused();
  }

  stop() {
    this.#currentState = new Stopped();
  }

  report() {
    this.#currentState.handle();
  }
}


const game = new Game();

game.report();
game.run();
game.report();
game.pause();
game.report();
game.resume();
game.report();
game.stop();
game.report();
