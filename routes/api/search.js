const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const passport = require("passport");

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
    // Find users by name, exclude password, workweek and coworkers
    const searchValue = req.query.name;
    console.log(searchValue, typeof searchValue);
    User.find(
      { name: { $regex: searchValue, $options: "i" } },
      { password: 0, workweek: 0, coworkers: 0 }
    ).then((search) => {
      if (search) {
        res.status(200).send(search);
      } else {
        res.status(400).json({
          msg: "Cannot return search",
        });
      }
    });
  }
);

/**
 * @route GET api/search/add
 * @desc Add a coworker to document
 * @access Private
 */
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /**
     * Recieve a id from a user u want to add in client
     * and push that user to both logged in users coworker array
     * and the added coworkers array
     */
    let addedUser = req.body.addedUserId;
    User.findOne({ _id: addedUser }).then((user) => {0
      if (user) {
        // update coworkers friends array
        User.findByIdAndUpdate(
          { _id: req.user._id },
          { $push: { coworkers: user } },
          (err, docs) => {
            if (err) console.log(err);
            else console.log("Updated user: ", docs);
          }
        );

        // update coworkers friends array
        User.findByIdAndUpdate(
          { _id: addedUser },
          { $push: { coworkers: req.user } },
          (err, docs) => {
            if (err) console.log(err);
            else console.log("Updated coworker", docs);
          }
        );

        res.status(200).json({
          msg: "Succesfuly updated the friends list!",
        });
      } else {
        res.status(400).json({
          msg: "Cannot find the user you wanna add",
        });
      }
    });
  }
);

module.exports = router;
