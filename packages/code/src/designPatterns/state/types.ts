export abstract class State {
  abstract handle(): void;
}

export class Init extends State {
    handle(): void {
      console.log('I am in INIT state');
    }
  }
  

export class Running extends State {
  handle(): void {
    console.log('I am in RUNNING state');
  }
}

export class Paused extends State {
  handle(): void {
    console.log('I am in PAUSED state');
  }
}

export class Stopped extends State {
  handle(): void {
    console.log('I am in STOPPED state');
  }
}
