import {
  describe, it, before, after,
} from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/index';
import db from '../app/lib/db';

chai.use(chaiHttp);

const data1 = {
  name: 'Plasma Blaster Pistol',
  price: 600000,
  quantity: 10,
  image: 'http://www.img.com/image.jpeg',
};
const data2 = {
  name: 'Plasma Blaster Rifle',
  price: 600000,
  quantity: 10,
  image: 'http://www.img.com/image.jpeg',
};

describe('All Store CRUD routes', () => {
  before(() => {
    db.store = {}; // empty db
  });
  after(() => {
    db.store = {};
  });

  let ID;

  describe('POST /api/v1/products', () => {
    it('should add a new product to db', () => {
      chai.request(app).post('/api/v1/products').send(data1).then(); // post a product
      return chai.request(app)
        .post('/api/v1/products') // post another product
        .send(data2)
        .then((res) => {
          ID = res.body.id;
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('name').eqls('Plasma Blaster Rifle');
          expect(res.body).to.have.property('price').eqls(600000);
          expect(res.body).to.have.property('quantity').eqls(10);
          expect(res.body).to.have.property('image');
          expect(res.body).to.have.property('minimum').eqls('false');
          expect(res.body).to.have.property('added');
          expect(Object.keys(db.store)).to.have.lengthOf(2);
        });
    });

    it('should not post a product with incomplete data', () => chai.request(app)
      .post('/api/v1/products')
      .send({
        name: 'Blaster',
        price: '600000',
        quantity: 3,
      })
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').eqls('Incomplete data');
        expect(Object.keys(db.store)).to.have.lengthOf(2, 'number of products should be 2');
      }));
  });

  describe('GET /api/v1/products', () => {
    it('should get all products from db', () => chai.request(app)
      .get('/api/v1/products')
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(2);
      }));
  });

  describe('GET /api/v1/products/:id', () => {
    it('should get a product from db by id', () => chai.request(app)
      .get(`/api/v1/products/${ID}`)
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').equal(ID);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('price');
        expect(res.body).to.have.property('quantity');
        expect(res.body).to.have.property('image');
        expect(res.body).to.have.property('minimum');
        expect(res.body).to.have.property('added');
      }));

    it('should not get product with invalid id path', () => chai.request(app)
      .get('/api/v1/products/INVALID_ID')
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res.body).to.have.property('error').equal('Product does not exist');
      }));
  });

  describe('PUT /api/v1/products/:id', () => {
    it('should update product by id', () => chai.request(app)
      .put(`/api/v1/products/${ID}`)
      .send({
        price: 500000,
        quantity: 2,
      })
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').eqls(ID);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('price').eqls(500000);
        expect(res.body).to.have.property('quantity');
        expect(res.body).to.have.property('image');
        expect(res.body).to.have.property('minimum').eqls('true');
        expect(res.body).to.have.property('added');
        expect(res.body).to.have.property('modified');
      }));

    it('should not update product with invalid id path', () => chai.request(app)
      .put('/api/v1/products/INVALID_ID')
      .send({
        price: 500000,
        quantity: 2,
      })
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').eqls('Product does not exist');
      }));
  });

  describe('DELETE /api/v1/products/:id', () => {
    it('should not delete product with invalid id path', () => chai.request(app)
      .delete('/api/v1/products/INVALID_ID')
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').eqls('Product does not exist');
        expect(Object.keys(db.store)).to.have.lengthOf(2);
      }));

    it('should delete product by id', () => chai.request(app)
      .delete(`/api/v1/products/${ID}`)
      .then((res) => {
        expect(res).to.be.json; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eqls('Delete successful');
        expect(Object.keys(db.store)).to.have.lengthOf(1);
      }));
  });
});
