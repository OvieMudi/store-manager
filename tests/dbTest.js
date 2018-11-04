import { describe, it } from 'mocha';
import { expect } from 'chai';
import db from '../app/lib/db';

describe('# db database', () => {
  it('should return an object', () => {
    expect(db).to.be.an('object');
  });

  it('should have all properties', () => {
    db.foo = 'bar';
    db.fooz = 'barz';
    expect(Object.keys(db)).to.have.lengthOf(2);
    expect(db).to.have.property('foo').which.equals('bar');
    expect(db).to.have.property('fooz').which.equals('barz');
  });
});
