//@ts-check
/**@module */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**@namespace searchSchema */
const searchSchema = new Schema({
  /**@name name*/
  //campsite name
  name: { type: String, required: true },
  /**@name author*/
  location: { type: String, required: true },
  /**@name username*/
  rating: { type: String, required: true },
  /**@name synopsis*/
  description: String,
  /**@name date*/
  availability: { type: Date, default: Date.now },
   /**@name date*/
   infoLink: {  type: String, required: true },
    /**@name date*/
    reservationURL: {  type: String, required: true },
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search; 
