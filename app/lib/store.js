class Store {
  constructor() {
    this.totalStock = undefined;
    this.allProducts = {};
  }

  // Create new product and add to #allProducts
  addNewProduct(data) {
    const key = data.id.toString();
    this.allProducts[key] = {
      name: data.name,
      id: data.id,
      price: data.price,
      quantity: data.quantity,
      minimum: data.minimum,
      date: data.date,
      image: data.image,
    };
  }

  // Get all products
  getAllProducts() {
    const { allProducts } = this;
    return allProducts;
  }

  // Modify single product
  setProduct(data) {
    const pid = data.id.toString();
    this.allProducts[pid] = {
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      image: data.image,
      minimum: this.allProducts[pid].minimum,
      date: this.allProducts[pid].date,
      modDate: new Date().toISOString().replace('T', ' ').substr(0, 16),
    };
    this.setMinimum(pid);
    return this.allProducts[pid];
  }

  // Resets minimum quantity allowed
  setMinimum(id) {
    const pid = id;
    const { quantity } = this.allProducts[pid];
    this.allProducts[pid].minimum = !!(quantity < 3);
  }

  // Delete a product
  deleteProduct(id) {
    // delete product if product exist, return boolean
    const pid = id;
    const deleted = this.allProducts[pid] ? delete this.allProducts[pid] : false;
    return !!deleted;
  }
}

export default Store;
