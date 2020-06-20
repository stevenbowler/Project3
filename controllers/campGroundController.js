//@ts-check

const db = require("../models");

// Defining methods for the booksController
/**@module */
module.exports = {
  /**@function findAll */
  findAll: function (req, res) {
    db.CampGround
      // .find({ username: req.originalUrl.slice(13) })
      .find({ username: req.query.name })
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
    db.CampGround
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
