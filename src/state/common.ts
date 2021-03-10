namespace App {
  export class State<T> {
    protected listeners: ((project: T) => void)[] = [];

    constructor() {}

    addListener(listener: (projects: T) => void) {
      this.listeners.push(listener);
    }
  }
}
