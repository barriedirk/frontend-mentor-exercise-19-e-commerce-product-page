// NOTE: No used in this project

export class Subject {
  observers = [];

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyAll() {
    for (let observer of this.observers) {
      observer.notify();
    }
  }
}

export class Observer {
  constructor(fn, name) {
    this.fn = fn;
    this.name = name;
  }

  update() {
    console.log(`executing fn of ${this.name}`);
    this.fn();
  }
}
