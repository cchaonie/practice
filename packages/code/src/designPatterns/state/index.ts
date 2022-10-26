import { State, Init, Running, Paused, Stopped } from './types';

class Game {
  #state: State;
  constructor() {
    this.#state = new Init();
  }

  run() {
    this.#state = new Running();
  }

  resume() {
    this.#state = new Running();
  }

  pause() {
    this.#state = new Paused();
  }

  stop() {
    this.#state = new Stopped();
  }

  report() {
    this.#state.handle();
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
