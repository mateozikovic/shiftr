const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const passport = require("passport");
const { json } = require("express/lib/response");

/**
 * @route GET api/search/coworker
 * @desc Search a list of coworkers by name
 * @access Private
 */

router.get(
  "/coworker",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    console.log(req.body.name, typeof req.body.name)
    User.find({ name: { $regex: req.body.name, $options: 'i'}})
    .then((search) => {
      if(search) {
        res.status(200).send(search)
      } else {
        res.status(400).json({
          msg: "Cannot return search"
        })
      }
    })
  }
);

module.exports = router;
