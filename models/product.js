const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      let updateProducts = [...products];
      if(this.id){
        const existingProductId = products.findIndex((prod) => prod.id === this.id);
        updateProducts[existingProductId] = this;
      }else{
        this.id = Math.random().toString();
        updateProducts.push(this);
      }

      fs.writeFile(p, JSON.stringify(updateProducts), err => {
        console.log(err);
      });
    });
  }

  static deleteById(productId) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter((prod) => prod.id !== productId);

      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err){
          const product = products.find(prod => prod.id === productId);
          console.log("CART -- DELETE PRODUCT please: ", product.price);
          Cart.deleteProduct(productId, product.price);
        }
        console.log(err);
      });
    });
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
