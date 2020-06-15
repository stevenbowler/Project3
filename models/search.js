//@ts-check
/**@module */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**@namespace searchSchema */
const searchSchema = new Schema({
  /**@name name*/
  //campsite name
  name: { type: String, required: true },
  /**@name location*/
  location: { type: String, required: true },
  /**@name rating*/
  rating: { type: String, required: false },
  /**@name description*/
  description: String,
  /**@name availability*/
  availability: { type: Date, default: Date.now },
  /**@name imageURL*/
  imageURL: { type: String, required: false },
   /**@name infoLink*/
   infoLink: {  type: String, required: true },
    /**@name reservationURL*/
    reservationURL: {  type: String, required: true },
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search; 
