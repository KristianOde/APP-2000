/**
 * Skrevet av Mikael og Magnus
 */

require("dotenv").config();

let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");

/*Mikael start*/

let userSchema = require(__dirname + "/models/User");
let loggSchema = require(__dirname + "/models/Logg");

/**
 * Registrerings rute som krypterer passordet og deretter sender informasjonen til databasen
 */
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

/**
 * Innlogginsrute som finner bruker i databasen og sammenlignerdet krypterte passordet
 */
router.route("/login").get((req, res) => {
  let email = req.query.email;
  let password = req.query.password;

  userSchema.findOne({ email: email }, function (err, user) {

    if (err) {
      return res.status(500).send("lol");
    }
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        console.log("yes user");
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
/**
 * Denne sjekker om eposten eksistere allerede i databasen
 */
router.route("/emailCheck").get((req, res) => {
  let email = req.query.email;

  userSchema.findOne({ email: email }, function (err, user) {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    if (!user) {
      console.log("Email Is Free");
      return res.status(200).send(user);
    } else {
      console.log("Email Is Taken");
      return res.status(404).send("Taken Email");
    }
  });
});

/**
 * Denne printer ut all loggene som er i databasen,
 * dette er en av ekstrakravene.
 */
router.route("/getLogg").get((req, res) => {
  loggSchema.find({}, function (err, logg) {
    if (err) {
      return res.status(500).send("lol");
    }
    if (logg) {
      console.log("yes logg");
      return res.status(200).send(logg);
    } else {
      console.log("404 no logg");
      return res.status(404).send("No such logg");
    }
  });
});

/**
 * Sletter innlogget bruker
 */
router.route("/delete").put((req, res) => {
  let email = req.body.email;
  let username = req.body.username;

  userSchema.findOneAndDelete({ email: email }, function (err, user) {
    if (err) {
      console.log("500 error");
      return res.status(500).send("Error");
    }
    if (!user) {
      console.log("User does not exist");
      return res.status(404).send("User does not exist");
    } else {
      console.log("User deleted");
      return res.status(200).send(user);
    }
  });
});

/**
 * Logger en av brukerens handlinger.
 */
router.route("/logg").post((req, res, next) => {
  let nyLogg = {
    email: req.body.email,
    date: req.body.date,
    act: req.body.act,
  };
  loggSchema.create(nyLogg, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(nyLogg);
      return res.status(200).send(data);
    }
  });
});

/*Magnus start*/

/**
 * Oppdateringsrute som oppdaterer brukernavnet
 */
router.route("/update").put((req, res) => {
  let email = req.body.email;
  let username = req.body.username;

  userSchema.findOneAndUpdate(
    { email: email },
    { $set: { username: username } },
    { new: true, useFindAndModify: false },
    function (err, user) {
      if (err) {
        console.log("500 error");
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
/*Mikael slutt*/
/*Magnus slutt*/

module.exports = router;
