var express = require('express');
var app = express();
const fs = require('fs');
var path = require('path');


app.get('/', function(req, res, next) {

    const data = fs.readFileSync(path.join(__dirname, '../store-data/products.json'));
    const storeProducts = JSON.parse(data);
    console.log(storeProducts);
    res.render('store/products', {
        title: 'Luxury Home', 
        data: storeProducts.products,
        searchInput : null
    })
})

app.post('/search', function(req, res, next) {
    console.log(req.body);
    var searchInput = req.body.searchInput;
    searchInput = searchInput.toLowerCase();
    console.log(searchInput);

   var data = fs.readFileSync(path.join(__dirname, '../store-data/products.json'));
   data = JSON.parse(data);
    
    var filteredProducts = [];
    data.products.forEach(product => {
        var productName = product.name.toLowerCase();
        if(productName.includes(searchInput)){
            filteredProducts.push(product);
        }
    });

    var responseProducts = {};
    var result = filteredProducts.length > 0 ? filteredProducts : null
    console.log(result);
    res.render('store/products', {
        title: 'Luxury Home', 
        data: result,
        searchInput : searchInput
    })
})


app.get('/product/(:id)', function(req, res, next) {
    console.log(req.params.id);
    var id = req.params.id
    

   var data = fs.readFileSync(path.join(__dirname, '../store-data/products.json'));
   data = JSON.parse(data);
    
    var productData  = null;
    for(var i = 0;i<data.products.length ; i++){
        var product = data.products[i];
        if(product.id == id){
            productData = product;
            break;
        }
    }
    console.log(productData);
    res.render('store/single-product', {
        title: product.name, 
        product: productData,
    })
})

app.get('/collection/(:name)', function(req, res, next) {
    console.log(req.params.name);
    var collectionName = req.params.name
    collectionName = collectionName.toLowerCase();
    console.log(collectionName);

   var data = fs.readFileSync(path.join(__dirname, '../store-data/products.json'));
   data = JSON.parse(data);
    
    var filteredProducts = [];
    data.products.forEach(product => {
        var collection = product.collection.toLowerCase();
        if(collection == collectionName ){
            filteredProducts.push(product);
        }
    });

    var responseProducts = {};
    var result = filteredProducts.length > 0 ? filteredProducts : null
    console.log(result);
    res.render('store/products', {
        title: 'Luxury Home', 
        data: result,
        searchInput : collectionName.toUpperCase()
    })
})


module.exports = app
