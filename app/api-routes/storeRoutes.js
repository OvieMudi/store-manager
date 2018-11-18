import express from 'express';
import store from '../lib/store';

const Router = express.Router();

// CREATE & READ
Router.route('/')
  .get(store.getProducts)
  .post(store.postProduct);

// READ, UPDATE & DELETE
Router.route('/:id')
  .get(store.getProduct)
  .put(store.updateProduct)
  .delete(store.removeProduct);

export default Router;
