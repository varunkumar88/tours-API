const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10;

router.post('/signup', (req, res, next)=>{
  let email = req.body.email;
  let password = req.body.password;
    if(email === "" || password === ""){
      res.status(400).json( {
          errorMessage: "Please enter both, email and password to signup"
      });
      return;
  }

  User.findOne({email:email})
        .then((user)=>{
            if(user){
                res.status(409).json({
                    errorMessage: "Email already exists, please choose another one."
                });    
            }
            else{                
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if(!err){
                        User.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            userName:req.body.userName,
                            email: req.body.email,
                            password: hash,
                        })
                        .then((user) => {
                          //  res.redirect("/shopping/login");
                        })
                        .catch((err) => {
                            console.log("Error", err);
                        });
                    }
                    else{
                        console.log("error occurred while creating password hash");
                    }
                });
            }
        })

}); 
module.exports = router;