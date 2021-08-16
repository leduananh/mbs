import { firebaseApp } from '../../db.js';

export class FireBaseHelper {
  #storage;

  constructor() {
    this.#storage = firebaseApp.storage();
  }

  async uploadImage(path, file) {
    try {
      const storageRef = this.#storage.ref();
      const fileRef = storageRef.child(path);
      await fileRef.put(file);
      const downloadURL = await fileRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      return null;
    }
  }
}
