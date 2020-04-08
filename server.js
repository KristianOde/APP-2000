/**
 * Skrevet av Mikael
 */

let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

// Express Route
const userRoute = require(__dirname + '/user.routes')

const path = require('path');
require('dotenv').config();  
const PORT = process.env.PORT || 4000;



// Connecting mongoDB Database
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:admin@cluster0-68kov.mongodb.net/test?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,})
.then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/users', userRoute)

const server = app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
})

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
