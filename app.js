const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

// env variables
require("dotenv").config();
let db_user = process.env.DB_USER;
let db_pass = process.env.DB_PASS;

// connection
mongoose.connect(
  `mongodb+srv://${db_user}:${db_pass}@shiftr.wvvsa.mongodb.net/Shiftr?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

// Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, 'public')));


// search for users and get a list back
app.get(
  "/userlistsearch/:searchvalue",
  isLoggedInFunction.isLoggedIn,
  function (req, res) {
    let searchValue = req.params.searchvalue;

    UserInfo.find({ firstName: searchValue }, function (err, users) {
      let userMap = {};

      users.forEach(function (user) {
        userMap[user._id] = user;
      });
      
      console.log(req.cookies);

      res.send(userMap);
    });
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
