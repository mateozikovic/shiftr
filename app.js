const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

// Initialize
const app = express();

// connection
const database = require("./config/key").db_URL;
mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Unable to connect with the database!", err);
  });

// Seting up the static directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

// Bring in the Users route
const users = require('./routes/api/users');
const search = require('./routes/api/search');
const workweek = require('./routes/api/workweek');
app.use('/api/users', users);
app.use('/api/search', search);
app.use('/api/workweek', workweek);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}`));
