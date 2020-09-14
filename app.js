var express = require('express')
var app = express()


app.set('view engine', 'ejs')

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var store = require('./routes/store')

app.use('/', store)




app.listen(3000, function(){
	console.log('Luxury Home Store Started at port 3000: http://127.0.0.1:3000')
})