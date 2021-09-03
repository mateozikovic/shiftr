let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt'); 

const User = require('../models/user');
const UserInfo =  require('../models/userinfo');

router.get('/', function(req, res) {
    res.render("register", {title: "Registration"}); 
 });

router.post('/', async(req, res) => {

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

module.exports = router;