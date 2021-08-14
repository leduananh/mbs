export class Errors {
  #errors;
  constructor(errors) {
    this.#errors = new Array();
  }
  push(data) {
    this.#errors.push(data);
  }
  isError() {
    return this.#errors.length !== 0;
  }
  toString() {
    return `{
              ${this.#errors
                .map((error) => {
                  return `${error.pos}: ${error.msg}`;
                })
                .join(',\n')}
          }`;
  }
}
