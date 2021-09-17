const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const hbs               = require('express-handlebars');
const session           = require('express-session');
const mongoose          = require('mongoose');
const passport          = require('passport');
const localStrategy     = require('passport-local').Strategy;
const bcrypt            = require('bcrypt'); 
const app               = express();

// env variables
require('dotenv').config();
let db_user = process.env.DB_USER;
let db_pass = process.env.DB_PASS;

// models
const User = require('./models/user');
const UserInfo =  require('./models/userinfo');

// connection
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@shiftr.wvvsa.mongodb.net/Shiftr?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
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
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

//router vars and middleware
let registration = require('./routes/registration');
app.use('/register', registration);

let loggedin = require('./routes/loggedinuser');
app.use('/user', loggedin);


// Passport.js serialising and deserialising the user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done){
    User.findById(id, function(err, user) {
        done(err, user)
    })
});

// comparing hash with bcrypt 
passport.use(new localStrategy(function (username, password, done){
    User.findOne({username: username}, function(err, user){
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' }); 

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if (res === false) return done(null, false, {message: 'Incorrect password.'});
            
            return done(null, user);
        });
    });
}));

const isLoggedInFunction = require('./functions');
const isLoggedOutFunction = require('./functions');

// Routes
app.get('/', isLoggedInFunction.isLoggedIn, (req, res) => {
    res.render("index", {title: req.user.username});
});


app.get('/login',isLoggedOutFunction.isLoggedOut, (req, res) => {
    let response = {
        title: "Login",
        error: req.query.error
    }
    res.render('login', response);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login?error=true'
}));

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));



