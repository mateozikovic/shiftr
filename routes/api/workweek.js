const express = require("express");
const Workweek = require("../../models/Workweek");
const router = express.Router();
const passport = require("passport");

/**
 * @route api/worwkeek/create
 * @desc Create a new workweek
 * @access Private
 */

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let weekName = req.body.weekName;
    let workers = req.body.workers;
    let monday = req.body.monday;
    let tuesday = req.body.tuesday;
    let wednesday = req.body.wednesday;
    let thursday = req.body.thursday;
    let friday = req.body.friday;
    let saturday = req.body.saturday;
    let sunday = req.body.sunday;

    Workweek.create({
      weekName: weekName,
      workers: workers,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    }).then((doc) => {
      if (doc) {
        res.status(200).json({
          msg: "Workweek created",
        });
      } else {
        res.status(400).json({
          msg: "Error creating workweek",
        });
      }
    });
  }
);
/**
 * @route GET api/workweek/returnall
 * @desc return workweeks
 * @access private
 */

router.get(
  "/returnall",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = String(req.user._id);

    await Workweek.find({"workers._id": user}).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({
          msg: "Can't return workweek",
        });
      }
    });
  }
);

module.exports = router;
