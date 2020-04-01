/**
 * Skrevet av Mikael og Magnus
 */

require('dotenv').config()

let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken');


let userSchema = require('../models/User');

// Lager bruker
router.route('/create-user').post((req, res, next) => {
    userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      //res.json(data)

      const email = req.body.email
      const user = { email: email }

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
      res.json({ accessToken: accessToken })
      
    }
  })
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Finner bruker
router.route('/login').get((req, res) => {
  let email = req.query.email;
  //console.log(email)
  let password = req.query.password;
  
  userSchema.findOne({email: email, password: password}, function(err, user) {
    if(err) {
      return res.status(500).send("lol");
    }
    if(!user) {
      console.log("404 no user")
      return res.status(404).send("No such user");
    } else {
      console.log("yes user")
      return res.status(200).send(user);
      
    }
    
  })
})

// Finner og oppdaterer noe i databasen
router.route('/update').put((req, res) => {
  let email = req.query.email;
  let password = req.query.password;
  let username = req.query.username;

  userSchema.findOneAndUpdate({email: email, password: password, username: username},  {$set: {"email":"Ny email"}},
  {new: true, useFindAndModify: false}, function(err, user) {
    if(err) {
      return res.status(500).send("Error");
    }
    if(!user) {
      console.log("User does not exist")
      return res.status(404).send("User does not exist");
    } else {
      console.log("User changed")
      return res.status(200).send(user);
      
    }
  })
})

module.exports = router;