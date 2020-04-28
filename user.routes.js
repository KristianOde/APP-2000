/**
 * Skrevet av Mikael og Magnus
 */

require("dotenv").config();

let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");

let userSchema = require(__dirname + "/models/User");

// Lager bruker, hasher passord og lagrer den i databasen
router.route("/register").post((req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      let nyBruker = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };
      userSchema.create(nyBruker, (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log(nyBruker);
          return res.status(200).send(data);
        }
      });
    });
  });
});

// Finner bruker
router.route("/login").get((req, res) => {
  let email = req.query.email;
  let password = req.query.password;

  console.log(email + " " + password);

  userSchema.findOne({ email: email }, function (err, user) {
    console.log(user + "<- passord1");

    if (err) {
      return res.status(500).send("lol");
    }
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        console.log("yes user");
        console.log(user + "<- passord2");
        return res.status(200).send(user);
      } else {
        console.log("404 wrong password");
        return res.status(404).send("wrong passaeoe");
      }
    } else {
      console.log("404 no user");
      return res.status(404).send("No such user");
    }
  });
});

// Finner og oppdaterer noe i databasen
router.route("/update").put((req, res) => {
  let email = req.query.email;
  let password = req.query.password;
  let username = req.query.username;

  userSchema.findOneAndUpdate(
    { email: email, password: password, username: username },
    { $set: { email: "Ny email" } },
    { new: true, useFindAndModify: false },
    function (err, user) {
      if (err) {
        return res.status(500).send("Error");
      }
      if (!user) {
        console.log("User does not exist");
        return res.status(404).send("User does not exist");
      } else {
        console.log("User changed");
        return res.status(200).send(user);
      }
    }
  );
});

module.exports = router;
