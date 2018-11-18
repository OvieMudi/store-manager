import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/index';

chai.use(chaiHttp);

const data1 = {
  name: 'Iphone X',
  id: 12121,
  price: 600000,
  quantity: 10,
  minimum: false,
  date: new Date().toISOString().replace('T', ' ').substr(0, 19),
  image: 'http://www.img.com/image.jpeg',
};
// const pid1 = data1.id.toString();

describe('All routes performing crud operations on Store', () => {
  it('should add a new product at "/api/v1/products" with POST', () => chai.request(app)
    .post('/api/v1/todos')
    .send(data1)
    .then((res) => {
      expect(res).to.be('json');
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').eqls('Successfully added');
      expect(res.body).to.have.property('created').eqls(true);
    }));

  it(`should return a false created status
      if a product is added again`, () => chai.request(app)
    .post('/api/v1/todos')
    .send(data1)
    .then((res) => {
      expect(res).to.be('json');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').eqls('Resource already exists');
      expect(res.body).to.have.property('created').eqls(false);
    }));
});
