const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { response } = require('../app');

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('logged out');
  });

router.post("/login", (req,res, next)=> {
    if (req.body.email === "" || req.body.password === "") {
        res.status(400).json( {
          errorMessage: "Please enter both, username and email to log in.",
        });
        return;
    }
     User
        .findOne({email: req.body.email})
        .then((user)=> {      
            if(!user) {
                res.status(404).json({
                    errorMessage: "The user does not exist"
                });

                return;
            } 
            bcrypt.compare(req.body.password, user.password, function(err, match) {
                if(err){
                    console.log("error occurred in password comparison", err);

                } else if(match) {
                   // req.session.currentUser = user;
                    res.status(200).json(user);
                } else {
                    
                    res.status(401).json( {
                        errorMessage : "Incorrect credentials"
                    });
                }
            });
            
        })
        .catch((err)=> { console.log("Err", err) })
})

module.exports = router;