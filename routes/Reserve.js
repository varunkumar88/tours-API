const express = require('express');
const Reserve = require("../models/Reserve");
const router = express.Router();
var mongoose = require('mongoose');
router.post('/reserve', (req, response, next) => { 
    Reserve
      .create({
          name:req.body.name,
          date:req.body.date,
          time:req.body.time,
          location:req.body.location,
          destination:req.body.destination
        })
      .then((response) => {
          response.status(200).json({"response":"Reserve sucessfully added"});
        })
      .catch(error => {
          response.json(error);
        });
      });

      router.get('/reserve', (req, res, next) => {
        Reserve.find()
          .then(allTheproducts => {
            res.json(allTheproducts);
          })
          .catch(err => {
            res.json(err);
          })
      });

router.get('/reserve/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Reserve.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

router.put('/reserve/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Reserve.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})
router.delete('/reserve/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Reserve.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})
module.exports = router;
