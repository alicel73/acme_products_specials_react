const express = require('express');
const app = express();
const path = require('path');

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_db');

const Product = conn.define('product', {
    name: Sequelize.STRING,
    isSpecial: Sequelize.BOOLEAN
})

conn.sync({ force: true })
    .then(()=> {
        return Promise.all([
            Product.create({ name: 'lollipop', isSpecial: false }),
            Product.create({ name: 'chocolate', isSpecial: true}),
            Product.create({ name: 'cake', isSpecial: true }),
        ])
    })

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.put('/api/products/:id', (req, res, next) => {
    Product.findById(req.params.id)
       .then(product => { 
           product.isSpecial = true;
           return product.save();
        })
        .then(product => res.send(product))
        .catch(next);
})

app.get('/api/products', (req, res, next) => {
    let regProducts = [];
    let specProducts = [];
    let products = [];
    Product.findAll()
        .then(products => {
            regProducts = products.filter(product => !product.isSpecial);
            specProducts = products.filter(product=> product.isSpecial);
            products[0] = regProducts;
            products[1] = specProducts;
            res.send(products);
        })
        .catch(next);
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));