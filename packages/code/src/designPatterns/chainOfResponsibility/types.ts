export class Request {
  name: string;
  tags: string[] = [];
  constructor(name: string) {
    this.name = name;
  }
}

export abstract class Handler {
  successor?: Handler;
  abstract handle(request: Request): void;
}

export class HandlerA extends Handler {
  handle(request: Request) {
    request.tags.push('Handled by A');
    this.successor?.handle(request);
  }
}

export class HandlerB extends Handler {
  handle(request: Request) {
    if (request.name === "TOM") {
      request.tags.push('Handled by B');
    }
    this.successor?.handle(request);
  }
}

export class HandlerC extends Handler {
  handle(request: Request) {
    if (request.name !== "TOM") {
      request.tags.push('Handled by C');
    }
    this.successor?.handle(request);
  }
}