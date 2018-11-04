import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/index';

chai.use(chaiHttp);

describe('Server routes', () => {
  it('Should return root page', () => chai.request(app)
    .get('/')
    .then((res) => {
      expect(res).to.have.status(200);
    })
    .catch((err) => {
      throw err.message;
    }));
});
