const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    }).catch( err => {
      console.log(`shop.getProducts() err: ${err}`);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        prod: product[0],
        pageTitle: product ? `Product ${product.title}` : 'Not found',
        path: '/products'
      });
    }).catch((err) => {
      console.log(`shop.getProduct() err: ${err}`);
    })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch( err => {
      console.log(`shop.getIndex() err: ${err}`);
    });
};

exports.deleteFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  const price = req.body.price;
  Cart.deleteProduct(prodId, price);
  res.redirect('/cart');
};


exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    
  Product.fetchAll()
    .then(([products]) => {
      let cartProducts = [];
      let total = products.length ? cart.totalPrice : 0;
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        total,
        products: cartProducts
      });
    }).catch( err => {
      console.log(`shop.getCart() err: ${err}`);
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      Cart.addProduct(prodId, product[0].price);
      res.redirect('/cart');
    }).catch((err) => {
      console.log(`shop.postCart() err: ${err}`);
    })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
