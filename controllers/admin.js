const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
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

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        url: "add-product",
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
  
      req.user.createProduct({
              title,
              price,
              imageUrl,
              description,
          })
          .then(()=> {
              res.redirect("/admin/products");
          })
          .catch( err => {
              console.log(`shop.getProducts() err: ${err}`);
              res.redirect("/");
          })
  };

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }

    const prodId = req.params.productId;
    /* Get products specific to the user */
    req.user.getProducts({ whre: { id: prodId }}) 
        .then( products => {
            const product = products[0];
            if (!product) {
            return res.redirect("/");
            }

            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                product: product,
                path: "/admin/edit-product",
                url: "edit-product",
                editing: true,
            });
        })
        .catch((err) => {
            console.log(`admin.getEditProduct() err: ${err}`);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const udpatedDescription = req.body.description;

    Product.findByPk(prodId)
        .then( product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = udpatedDescription;
            return product.save();
        })
        .then(()=> {
            res.redirect("/admin/products");
        })
        .catch( err => {
            console.log(`shop.getProducts() err: ${err}`);
            res.redirect("/");
        })
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    /*
    Product.destroy({ where: {
        id: 
    }})
    */
    Product.findByPk(prodId)
        .then( product => {
            return product.destroy();
        })
        .then(() => {
            res.redirect("/admin/products");          
        })
        .catch((err) => {
            console.log(`shop.postDeleteProduct() err: ${err}`);
            res.redirect("/");
        });  
};
