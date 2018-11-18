import uuid from 'uuid';
import db from './db';

// const dbStore = db.store;

class Store {
  constructor() {
    this.getAllProducts = () => db.store;
    this.productId = uuid;
    this.postProduct = this.postProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.modifyProduct = this.modifyProduct.bind(this);
  }

  // ================= STORE API ===============

  // Create a product
  postProduct(req, res) {
    const { body } = req;
    const product = this.addProduct(body);
    if (!product) return res.status(400).json({ error: 'Incomplete data' });
    return res.status(201).json(product);
  }

  // Get all products
  // eslint-disable-next-line class-methods-use-this
  getProducts(req, res) {
    const products = Object.values(db.store);
    return res.status(200).json(products);
  }

  // Get a product
  getProduct(req, res) {
    const { id } = req.params;
    const product = this.getAllProducts()[id];
    if (!product) return res.status(404).json({ error: 'Product does not exist' });

    return res.status(200).json(product);
  }

  // Update a product
  updateProduct(req, res) {
    const product = this.modifyProduct(req);
    if (!product) return res.status(404).json({ error: 'Product does not exist' });
    return res.status(200).json(product);
  }

  // Remove a product
  removeProduct(req, res) {
    const { id } = req.params;
    const product = this.getAllProducts()[id];
    if (!product) return res.status(404).json({ error: 'Product does not exist' });

    delete db.store[id];
    return res.status(200).json({ message: 'Delete successful' });
  }

  // ================= STORE HELPER METHODS===================

  // Create new product and add to db
  addProduct(body) {
    const id = this.productId();
    if (!body.name || !body.price || !body.quantity || !body.image) {
      return null;
    }

    db.store[id] = {
      id,
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      minimum: body.quantity < 3 ? 'true' : 'false',
      added: new Date().toISOString().replace('T', ' ').substr(0, 16),
      image: body.image,
    };
    return db.store[id];
  }

  // Modify a product
  modifyProduct(req) {
    const { params, body } = req;
    const { id } = params;
    const product = this.getAllProducts()[id];
    if (!product) return null;

    product.name = !body.name ? product.name : body.name;
    product.price = !body.price ? product.price : body.price;
    product.quantity = !body.quantity ? product.quantity : body.quantity;
    product.minimum = body.quantity < 3 ? 'true' : 'false';
    product.image = !body.image ? product.image : body.image;
    product.modified = new Date().toISOString().replace('T', ' ').substr(0, 16);
    return db.store[id];
  }
}

export default new Store();
