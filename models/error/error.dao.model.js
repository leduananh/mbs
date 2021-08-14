export class Errors {
  #state;
  #data;
  #msg;
  constructor(state, data, msg) {
    this.#state = state;
    this.#data = data;
    this.#msg = msg;
  }

  isError() {
    return this.#state;
  }

  getData() {
    return this.#data;
  }

  getMsg() {
    return this.#msg;
  }
}
