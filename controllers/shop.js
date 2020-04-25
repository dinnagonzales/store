const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        .then((prods) => {
            res.render("shop/product-list", {
                prods,
                pageTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => {
            console.log(`shop.getProducts() err: ${err}`);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    /*
    Product.findAll({ where: {
        id: prodId,
    }}).then((results) => {
        results is an array
    })
    */
    Product.findByPk(prodId)
        .then( prod => {
            res.render("shop/product-detail", {
            prod,
            pageTitle: prod ? `Product ${prod.title}` : "Not found",
            path: "/products",
            });
        })
        .catch((err) => {
            console.log(`shop.getProduct() err: ${err}`);
        });
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((prods) => {
            res.render("shop/index", {
                prods,
                pageTitle: "Shop",
                path: "/",
            });
        })
        .catch((err) => {
            console.log(`shop.getIndex() err: ${err}`);
        });
};

exports.deleteFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  const price = req.body.price;
  Cart.deleteProduct(prodId, price);
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    /*
    Product.fetchAll()
      .then(([products]) => {
        let cartProducts = [];
        let total = products.length ? cart.totalPrice : 0;
        for (product of products) {
          const cartProductData = cart.products.find(
            (prod) => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty,
            });
          }
        }
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          total,
          products: cartProducts,
        });
      })
      .catch((err) => {
        console.log(`shop.getCart() err: ${err}`);
      });
      */
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      Cart.addProduct(prodId, product[0].price);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(`shop.postCart() err: ${err}`);
    });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
