const express = require('express');
const Product = require("../models/Product");
const router = express.Router();
var mongoose = require('mongoose');
router.post('/products', (req, response, next) => {
    
    Product
      .create({
          name:req.body.name,
          description:req.body.description,
          price:req.body.price,
          image:req.body.image,
          currency:req.body.currency
        })
      .then((response) => {
          response.status(200).json({"response":"Product sucessfully added"});
        })
      .catch(error => {
          response.json(error);
        });
      });

      router.get('/products', (req, res, next) => {
        Product.find()
          .then(allTheproducts => {
            res.json(allTheproducts);
          })
          .catch(err => {
            res.json(err);
          })
      });



router.get('/products/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Product.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})
router.put('/products/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})
router.delete('/products/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})



module.exports = router;
