const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequalize = require('./util/database');
const User = require('./models/user');
const Product = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* Pass User to all routes */
app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(() => {
            console.log(`app.js ${err}`);
        })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { 
    constraints: true,
    onDelete: 'CASCADE',    // deleting a user will also delete the product
});
User.hasMany(Product);   // means the same as above

sequalize.sync()
    //.sync({ force: true }) //override DB with new changes
    .then((result) => {
        //Create Fake User
        User.findByPk(1)
            .then((user) => {
                if(!user){
                    User.create({ name: 'Dinna', email: 'contact@dinna.com' })
                }

                return user;
            })
            .then((user) => {
                app.listen(3000);
            })
    })
    .catch((err) => {
        console.log(`sequalize: ${err}`);
    });


