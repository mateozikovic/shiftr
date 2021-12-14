// global functions file

//check if user is logged in
module.exports.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

// check if user is logged out
module.exports.isLoggedOut = function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}