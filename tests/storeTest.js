// const assert = require('chai').assert;
import { expect, assert } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import store from '../app/lib/store';


const data1 = {
  name: 'Iphone X',
  id: 12121,
  price: 600000,
  quantity: 10,
  minimum: false,
  date: new Date().toISOString().replace('T', ' ').substr(0, 19),
  image: 'http://www.img.com/image.jpeg',
};
const data2 = {
  name: 'Iphone XL',
  id: 12122,
  price: 650000,
  quantity: 10,
  minimum: false,
  date: new Date().toISOString().replace('T', ' ').substr(0, 16),
  image: 'http://www.img.com/image.jpeg',
};
const data3 = {
  name: 'Mac Book Pro',
  id: 12123,
  price: 650000,
  quantity: 10,
  minimum: false,
  date: new Date().toISOString().replace('T', ' ').substr(0, 16),
  image: 'http://www.img.com/image.jpeg',
};
const key2 = data2.id.toString();

// ================== TESTS =======================

describe('Products Module', () => {
  const newData = {
    id: data2.id,
    name: 'Iphone XL Black',
    price: 500000,
    quantity: 2,
    image: 'http://www.img.com/image1.jpeg',
    minimum: true,
  };
  const newData2 = {
    id: data3.id,
    name: 'Iphone XL Black',
    price: 500000,
    quantity: 2,
    image: 'http://www.img.com/image1.jpeg',
    minimum: true,
  };

  // ============== store class =============

  describe('store Class', () => {
    it('should return an object', () => {
      assert.typeOf(store, 'object');
    });

    it('should have properties: totalStock, allProducts', () => {
      expect(store).to.have.property('totalStock');
      expect(store).to.have.property('allProducts');
    });

    it('should be an object', () => {
      const { allProducts } = store;
      assert.typeOf(allProducts, 'object');
    });
  });

  // ============ addNewProducts Method =============

  describe('#addNewProduct method', () => {
    it('should be a method', () => {
      expect(store.addNewProduct).to.be.a('function');
    });

    it('Should add new product to #allProducts object', () => {
      store.addNewProduct(data1);
      store.addNewProduct(data2);
      expect(store.allProducts[key2].name)
        .to.equal(data2.name);
      expect(store.allProducts[key2].id)
        .to.equal(data2.id);
      expect(store.allProducts[key2].price)
        .to.equal(data2.price);
      expect(store.allProducts[key2].quantity)
        .to.equal(data2.quantity);
      expect(store.allProducts[key2].minimum)
        .to.equal(data2.minimum);
      expect(store.allProducts[key2].image)
        .to.equal(data2.image);
    });
  });

  // =========== #getAllProducts Method ============
  describe('#getAllProducts Method', () => {
    beforeEach(() => {
      store.allProducts = {};
      store.addNewProduct(data1);
      store.addNewProduct(data2);
    });

    it('Should be a function', () => {
      assert.typeOf(store.getAllProducts, 'function');
    });

    it('Should return an object', () => {
      assert.typeOf(store.getAllProducts(), 'object');
    });

    it('Should get all products in the #allProducts object', () => {
      const allProducts = store.getAllProducts();
      assert.equal(Object.keys(allProducts).length, 2, 'Number of contained objects should be 2');
      expect(allProducts[key2].name).to.be.a('string').which.equals(data2.name);
      expect(allProducts[key2].id).to.be.a('number').which.equals(data2.id);
    });
  });

  // ============= #setProduct Method ===========
  describe('#setProduct method', () => {
    let modProduct;
    beforeEach(() => {
      store.allProducts = {};
      store.addNewProduct(data1);
      store.addNewProduct(data2);
      modProduct = store.setProduct(newData);
    });


    it('Should should be an method', () => {
      assert.typeOf(store.setProduct, 'function');
    });

    it('Should return an object', () => {
      assert.typeOf(modProduct, 'object', 'It should be an object');
    });

    it('Should not add a new object to the #allproducts', () => {
      assert.equal(Object.keys(store.allProducts).length, 2, 'Number of contained objects should be 2');
    });

    it('Should set values of objects in #allProducts', () => {
      assert.equal(modProduct.name, newData.name, 'It should set product name to newData.name');
      assert.equal(modProduct.price, newData.price, 'It should set price to newData.price');
      assert.equal(modProduct.quantity, newData.quantity, 'It set should quantity to newData.quantity');
      assert.equal(modProduct.image, newData.image, 'It should set image to newData.image');
      assert.equal(modProduct.minimum, newData.minimum, 'It should set minimum product to newData.mininum');
      assert.typeOf(modProduct.date, 'string');
      assert.typeOf(modProduct.modDate, 'string');
    });
  });

  // ================ #setMininum Method ============
  describe('#setMinimum Method', () => {
    store.addNewProduct(data1);
    store.addNewProduct(data2);
    store.addNewProduct(data3);
    const modProduct1 = store.setProduct(newData);
    const modProduct2 = store.setProduct(newData2);

    it('Should be a method', () => {
      assert.typeOf(store.setMinimum, 'function');
    });

    it('Should set the minimum number of products in stock', () => {
      assert.equal(modProduct1.minimum, newData.minimum, 'Reset product to new mininum');
      assert.equal(modProduct2.minimum, newData2.minimum, 'Reset product to new mininum');
    });
  });
});
