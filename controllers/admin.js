const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        url: "add-product",
        editing: false,
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const udpatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const udpatedDescription = req.body.description;

    const product = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        udpatedDescription,
        udpatedPrice
    );

    product
        .save()
        .then(([products]) => {
        res.redirect("/admin/products");
        })
        .catch((err) => {
        console.log(`shop.getProducts() err: ${err}`);
        });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteById(prodId);
  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([product]) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product: product[0],
        path: "/admin/edit-product",
        url: "edit-product",
        editing: true,
      });
    })
    .catch((err) => {
      console.log(`admin.getEditProduct() err: ${err}`);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  Product.create({
    title,
    imageUrl,
    price,
    description,
  })
    .then((result) => {
      console.log('Added product to database');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((prods) => {
            res.render("admin/products", {
                prods,
                pageTitle: "Admin Products",
                path: "/admin/products",
            });
        })
        .catch((err) => {
            console.log(`admin.getProducts() err: ${err}`);
        });
};
