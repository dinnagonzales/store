const Cart = require('./cart');
const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUE (?,?,?,?)',
      [ this.title, this.price, this.imageUrl, this.description ]
    );
  }

  static deleteById(productId) {

  }

  static findById(id, cb){
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
};
