import { Errors } from '../models/error/error.dao.model.js';
import { firebaseApp } from '../db.js';
import { UuidV5 } from '../Utilities/uuid/uuid.utilities.js';

export class ProductDao {
  #collection_name;
  #album_name;
  #repository;
  #storage;
  #uuid;
  constructor() {
    this.#collection_name = 'products';
    this.#album_name = 'products/';
    this.#repository = firebaseApp.firestore();
    this.#storage = firebaseApp.storage();
    this.#uuid = new UuidV5();
  }

   addProduct(product) {
    return new Promise(async (resolve, reject) => {
      try {
        let id = this.#uuid.generate(product.name);
        product.id = id;
        
        await this.#repository.collection(this.#collection_name).doc(id).set(product);

        resolve(new Errors(false, true, ''));

      } catch (error) {
        resolve(new Errors(true, null, error.message));
      }
    });
  }

   getProducts() {
    return new Promise(async (resolve, reject) => {
      try {
        let products_collection = await this.#repository.collection(this.#collection_name);
        let data = await products_collection.get();

        if (data.empty) reject(new Errors(true, null,'this'+ this.#collection_name +'collection is empty!!!'));

        let products = data.docs.map((doc) => doc.data());
        let errorList = []
        let albums = await this.getAlbums().catch(error=>{
          errorList.push(error)
        });
        
        let productsWithImage = await this.mergeProductWithUrl(products,albums).catch(error=>{
          errorList.push(error)
        
        });

        resolve(new Errors(false, productsWithImage, ''));
      } catch (error) {
        reject(new Errors(true, data, error.message));
      }
    });
  }

   getAlbums(){
    return new Promise(async (resolve, reject) => {
      try {
        let data = await this.#repository.ref(this.#album_name);
        if (data === null || data === undefined)
          reject(new Errors(true, null, 'this '+ this.#album_name +' albums is empty!!!'));
       
        resolve(new Errors(false, data, ''));

      } catch (error) {
        reject(new Errors(true, null, error.message));
      }
    });
  }

   getProductDownloadUrl(albums, imagePath) {
    return new Promise(async (resolve, reject) => {
      try {
        let imageRef = await data.child(imagePath);
        if(imageRef === null) reject(new Errors(true, null, 'dont have '+ imagePath +' in albums!!!'));
        
        let downloadUrl = await imageRef.getDownloadURL();

        resolve(new Errors(false, downloadUrl, ''));

      } catch (error) {
        reject(new Errors(true, null, error.message));
      }
    });
  }

   mergeProductWithUrl(products, albums) {
    return new Promise(async (resolve, reject) => {
      try {
        for(let i = 0; i < products.length; i++){
          let product = products[i];

          let path = product.imgPath

          let downloadUrl = this.getProductDownloadUrl(albums,path);

          product['url'] = downloadUrl;
        }

        resolve(new Errors(false, products, ''))
        
      } catch (error) {
        reject(new Errors(true, null, error.message));
      }
    });
  }
}


// async #getAlbums() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let data = await this.#repository.ref(this.#album_name);
//       if (data === null || data === undefined)
//         reject(new Errors(true, null, 'this '+ this.#album_name +' albums is empty!!!'));
//       resolve(new Errors(false, data, ''));
//     } catch (error) {
//       reject(new Errors(true, null, error.message));
//     }
//   });
// }
