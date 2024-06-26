export default class Stack {
  stack: Array<any>;

  constructor() {
    this.stack = [];
  }

  push(val: any) {
    this.stack.push(val);
  }

  pop() {
    if (this.stack.length >= 1) {
      return this.stack.pop();
    }
    return null;
  }

  empty() {
    this.stack = [];
  }

  top() {
    if (!this.isEmpty()) {
      return this.stack[this.stack.length - 1];
    }
    return null;
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}
