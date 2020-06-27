//@ts-check
/**@module */

/**@namespace campGroundControler */
const db = require("../models");

// Defining methods for the booksController
module.exports = {
  /**@function findAll */
  findAll: function (req, res) {
    // console.log("campgroundControler findAll req.query:", req.query.username);
    db.CampGround
      .find({ username: req.query.username })
      // .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  /**@function findById */
  findById: function (req, res) {
    db.CampGround
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  /**@function create */
  create: function (req, res) {
    console.log("Campground controller: ", req.body);
    db.CampGround
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  /**@function update */
  update: function (req, res) {
    db.CampGround
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  /**@function update */
  remove: function (req, res) {
    console.log("Campground delete controller: ", req.body);
    db.CampGround
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
