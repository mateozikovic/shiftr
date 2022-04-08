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
 * @route GET api/search/coworkerlist
 * @desc Return a list of all coworkers
 * @access private
 */

router.get(
  "/coworkerlist",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    let userId = req.user._id;
    User.find({ _id: userId }, "coworkers").then((list) => {
      if (list) {
        res.status(200).send(list[0].coworkers.toObject());
        console.log(list[0].coworkers.toObject());
      } else {
        res.status(400).json({
          msg: "Cannot return list of users",
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
    User.findOne({ _id: addedUser }).then((user) => {
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

/**
 * @route POST api/search/deletecoworker
 * @desc Delete a coworker from the array
 * @access Private
 */

router.post(
  "/deletecoworker",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body.email);
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { coworkers: { email: req.body.email } } },
      { safe: true }
    )
      .then((doc) => {
        console.log(doc);
        res.status(200);
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
