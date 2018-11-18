import { Router } from 'express';
import store from '../lib/store';

// CREATE & READ routes
Router.route('/api/v1/products')
  .post(store.addProduct)
  .get(store.getProducts);

export default Router;
