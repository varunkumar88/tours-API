var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser   = require('body-parser');
var mongoose = require('mongoose');
//var usersRouter = require('./routes/product');
var signup = require('./routes/signup');
var login = require('./routes/login');
var products = require('./routes/product')
var reserve = require('./routes/Reserve')
var app = express();
const Product = require('./models/Product');
const data = require('./seedData.json');
const Reserve = require('./models/Reserve');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var session = require('express-session');
const MONGODB_URI = 'mongodb://localhost:27017/shopping';

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
   // return self.connection.dropDatabase();
   //return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  Product.insertMany(data)
  .then( (dataInput) => {
    return Product.find()
      .select("name")
      .then(checkData => { console.log('The recipes are ', checkData) })
  })
  .catch(err => console.log(`Error while creating a new cat: ${err}`))
app.use(cors({
    origin:true,
     credentials:true
 }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', signup);
app.use('/', login);
app.use('/',products);
app.use('/',reserve);

module.exports = app;
