export class Request {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export interface Handler {
  (request: Request): boolean;
}
