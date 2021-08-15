import { v5, validate } from 'uuid';

export class IdGenerator {
  #generator;
  #validator;
  #NAMESPACE;
  constructor() {
    this.#generator = v5;
    this.#validator = validate;
    this.#NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  }

  isValidIdV5(uuid) {
    return this.#validator(uuid);
  }

  generate(data) {
    return this.#generator(data, this.#NAMESPACE);
  }
}
