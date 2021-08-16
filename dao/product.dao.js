import { Errors } from '../models/error/error.dao.model.js';
import { firebaseApp } from '../db.js';
import { IdGenerator } from '../Utilities/uuid/uuid.utilities.js';
import {Product} from '../models/Product.model.js'
export class ProductDao {
  #collection_name;
  #album_name;
  #repository;
  #storage;
  #idGenerator;
  constructor() {
    this.#collection_name = 'products';
    this.#album_name = 'products/';
    this.#repository = firebaseApp.firestore();
    this.#storage = firebaseApp.storage();
    this.#idGenerator = new IdGenerator();
  }

   addProduct(product) {
    return new Promise(async (resolve, reject) => {
      try {
        let id = this.#idGenerator.generate(product.name);
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
     
        let albums = await this.getAlbums()
        
        if(albums.isError()) {
          reject(albums);
          return;
        }
         
        let productsWithImage = await this.mergeProductWithUrl(products,albums.getData())

        if(productsWithImage.isError()){
          reject(productsWithImage);
          return;
        }
        
        resolve(new Errors(false, productsWithImage.getData(), ''));
      } catch (error) {
        reject(new Errors(true, data, error.message));
      }
    });
  }

  getProductByName(productName){
    return new Promise(async (resolve, reject) => {
      try {
        let id =  this.#idGenerator.isValidIdV5(productName) ? productName : this.#idGenerator.generate(productName);
       
        const productRef = await this.#repository
          .collection(this.#collection_name)
          .doc(id);

        const doc = await productRef.get();

        if (!doc.exists) {
          resolve(new Errors(true, null, 'dont have this product'));
          return
        } 
        
        resolve(new Errors(false, doc.data(), ''));

      } catch (error) {
        reject(new Errors(true, data, error.message));
      }
    });
  }

  async getAlbums(){
      try {
        let albums = await this.#storage.ref(this.#album_name);
        if (albums === null || albums === undefined)
          return new Errors(true, null, 'this '+ this.#album_name +' albums is empty!!!')
       
        return new Errors(false, albums, '')

      } catch (error) {
        return new Errors(true, null, error.message);
      }
  }

  async getProductDownloadUrl(albums, imagePath) {
      try {
        let imageRef = await albums.child(imagePath);
              
        let downloadUrl = await imageRef.getDownloadURL();

        return new Errors(false, downloadUrl, '');

      } catch (error) {
        return new Errors(true, null, error.message);
      }
  }

  async mergeProductWithUrl(products, albums) {
      try {
        for(let i = 0; i < products.length; i++){
          let product = products[i];

          let path = product.path

          let downloadUrl = await this.getProductDownloadUrl(albums,path);

          if(downloadUrl.isError()) product['url'] = null;

          product['url'] = downloadUrl.getData();
        }

        return new Errors(false, products, '')
    
      } catch (error) {
        return new Errors(true, null, error.message)
      }
  }
}