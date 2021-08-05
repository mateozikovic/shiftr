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

require('dotenv').config({path: __dirname + '/.env'})


// mongoose.connect(`mongodb+srv://${process.env['DB_USER']}:${process.env.DB_PASS}@shiftr.wvvsa.mongodb.net/Shiftr?retryWrites=true&w=majority`,
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(`mongodb+srv://user1:dvanaest13@shiftr.wvvsa.mongodb.net/Shiftr?retryWrites=true&w=majority`,
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
})

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



