const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const hbs               = require('express-handlebars ')
const mongoose          = require('mongoose');
const passport          = require('passport');
const localStrategy     = require('passport-local').Strategy;
const bcrypt            = require('bcrypt'); 
const app               = express();

mongoose.connect("mongodb+srv://abc123:kikiriki@shiftr.wvvsa.mongodb.net/Shiftr?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    userUnifiedTopology: true
});


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.engine('hbs', hbs({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "verygoodsecret", 
    resave: false,
    saveUninitialized
}));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done){
    // Setup user model
     
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));

