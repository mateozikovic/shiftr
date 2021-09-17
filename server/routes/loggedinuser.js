/**
 * route for getting the logged in user data from the userinfo collection
 */

let express = require('express');
let router = express.Router();
let mongooose = require('mongoose');
const UserInfo = require('../models/userinfo');

const lif = require('../functions');

router.get('/', lif.isLoggedIn, (req, res, next) => {
    const username = req.user.username;

    console.log(username);
    UserInfo.findOne({email: username}, (err, oneUserInfo) =>{
        console.log(oneUserInfo);
    }); 
});

module.exports = router;