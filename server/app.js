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

const User = require('./models/user');
const UserInfo =  require('./models/userinfo');

require('dotenv').config()

let db_user = process.env.DB_USER;
let db_pass = process.env.DB_PASS;

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


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done){
    User.findById(id, function(err, user) {
        done(err, user)
    })
});

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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

// Routes

app.get('/', isLoggedIn, (req, res) => {
    res.render("index", {title: "Home"});
});

app.get('/login',isLoggedOut, (req, res) => {
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

app.get('/register', function(req, res) {
   res.render("register", {title: "Registration"}); 
});

app.post('/register', async(req, res) => {

    // user.js model
    const username = req.body.email;
    const password = req.body.pass;


    //userinfo model
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const companyName = req.body.company;
    
    const exists = await User.exists(({username: username}));

    if(exists) req.query.error;
    
    // generate salt and save into User collection
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(password, salt, function(err, hash) {
            
            if(err) return next(err);

            const newUser = new User({
                username: username,
                password: hash
            }); 

            newUser.save();

            res.redirect('/login');
        });
    });

    // save into UserInfo collection
    const saveUserInfo = new UserInfo({
        email: username,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName
    });

    saveUserInfo.save(function(err, userInfo){
        if (err) return console.error(err);
        console.log(userInfo.firstName + " " + userInfo.lastName  + " user saved");   
    });
});

// Setup admin user
app.get('/setup', async (req, res) => {

	const exists = await User.exists({ username: "admin" });

	if (exists) {
		res.redirect('/login');
		return;
	};

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash("pass", salt, function (err, hash) {
			if (err) return next(err);
			
			const newAdmin = new User({
				username: "admin",
				password: hash
			});

			newAdmin.save();

			res.redirect('/login');
        });
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));



