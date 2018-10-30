// const assert = require('chai').assert;
import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import Products from '../app/lib/products';


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

  // ============== products class =============

  describe('Products Class', () => {
    it('should return an object', () => {
      const products = new Products();
      assert.typeOf(products, 'object');
    });

    it('should have properties: totalStock, allProducts', () => {
      const products = new Products();
      expect(products).to.have.property('totalStock');
      expect(products).to.have.property('allProducts');
    });

    it('should be an object', () => {
      const { allProducts } = new Products();
      assert.typeOf(allProducts, 'object');
    });
  });

  // ============ addNewProducts Method =============

  describe('#addNewProduct method', () => {
    const products = new Products();

    it('should be a method', () => {
      expect(products.addNewProduct).to.be.a('function');
    });

    it('Should add new product to #allProducts object', () => {
      products.addNewProduct(data1);
      products.addNewProduct(data2);
      expect(products.allProducts[key2].name)
        .to.equal(data2.name);
      expect(products.allProducts[key2].id)
        .to.equal(data2.id);
      expect(products.allProducts[key2].price)
        .to.equal(data2.price);
      expect(products.allProducts[key2].quantity)
        .to.equal(data2.quantity);
      expect(products.allProducts[key2].minimum)
        .to.equal(data2.minimum);
      expect(products.allProducts[key2].image)
        .to.equal(data2.image);
    });
  });

  // =========== #getAllProducts Method ============
  describe('#getAllProducts Method', () => {
    const products = new Products();
    products.addNewProduct(data1);
    products.addNewProduct(data2);

    it('Should be a function', () => {
      assert.typeOf(products.getAllProducts, 'function');
    });

    it('Should return an object', () => {
      assert.typeOf(products.getAllProducts(), 'object');
    });

    it('Should get all products in the #allProducts object', () => {
      const allProducts = products.getAllProducts();
      assert.equal(Object.keys(allProducts).length, 2, 'Number of contained objects should be 2');
      expect(allProducts[key2].name).to.be.a('string').which.equals(data2.name);
      expect(allProducts[key2].id).to.be.a('number').which.equals(data2.id);
    });
  });

  // ============= #setProduct Method ===========
  describe('#setProduct method', () => {
    const products = new Products();
    products.addNewProduct(data1);
    products.addNewProduct(data2);

    const modProduct = products.setProduct(newData);

    it('Should should be an method', () => {
      assert.typeOf(products.setProduct, 'function');
    });

    it('Should return an object', () => {
      assert.typeOf(modProduct, 'object', 'It should be an object');
    });

    it('Should not add a new object to the #allproducts', () => {
      assert.equal(Object.keys(products.allProducts).length, 2, 'Number of contained objects should be 2');
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
    const products = new Products();
    products.addNewProduct(data1);
    products.addNewProduct(data2);
    products.addNewProduct(data3);
    const modProduct1 = products.setProduct(newData);
    const modProduct2 = products.setProduct(newData2);

    it('Should be a method', () => {
      assert.typeOf(products.setMinimum, 'function');
    });

    it('Should set the minimum number of products in stock', () => {
      assert.equal(modProduct1.minimum, newData.minimum, 'Reset product to new mininum');
      assert.equal(modProduct2.minimum, newData2.minimum, 'Reset product to new mininum');
    });
  });
});
