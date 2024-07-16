export default class GameState {
  static NOT_STARTED = 0;
  static IN_PROGRESS = 1;
  static PAUSE = 2;
  static TERMINATED = 3;

  constructor(pageWidth, pageHeight) {
    this.stageWidth = Math.min(600, pageWidth);
    this.stageHeight = Math.min(600, pageHeight);

    this.isHit = false;

    this.state = GameState.NOT_STARTED;
    this.stateListeners = [[], [], [], []];

    this.animationId = null;
    this.lastPaintTimestamp = null;

    this.snake = null;
    this.apple = null;
  }

  addStateListener(state, listener) {
    this.stateListeners[state].push(listener.bind(this));
  }

  removeStateListener(state, listener) {
    const listeners = this.stateListeners[state];
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  removeAllListeners() {
    [
      GameState.NOT_STARTED,
      GameState.IN_PROGRESS,
      GameState.PAUSE,
      GameState.TERMINATED,
    ].forEach(state => {
      this.stateListeners[state] = [];
    });
  }

  changeTo(state) {
    if (this.state !== state) {
      this.state = state;

      for (const fn of this.stateListeners[this.state]) {
        fn();
      }
    }
  }

  startWatchingPlayer(listener) {
    window.addEventListener('keyup', listener);
  }

  stopWatchingPlayer(listener) {
    window.removeEventListener('keyup', listener);
  }

  /**
   * TODO implement this method
   * @returns whether the game is over
   */
  isGameOver() {
    return false;
  }

  /**
   * TODO implement this method
   */
  isAppleEaten() {}
}
