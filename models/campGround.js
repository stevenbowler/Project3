//@ts-check
/**@module */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**@namespace campGroundSchema */
const campGroundSchema = new Schema({
  /**@name userName*/
  username: { type: String },
  /**@name entityId*/

  entityId: { type: String },
  /**@name campGround*/
  //campsite name
  campGround: { type: String },
  /**@name city*/
  city: { type: String },
  /**@name state*/
  state: { type: String },
  /**@name distance*/
  distance: { type: Number },
  /**@name rating*/
  rating: { type: Number },
  /**@name description*/
  description: String,
  /**@name imageURL*/
  imageURL: { type: String },
  /**@name campsite_equipment_name*/
  campsite_equipment_name: { type: String },
  /**@name price_range_max*/
  price_range_max: { type: String },
  /**@name price_range_min*/
  price_range_min: { type: String },
  /**@name availability*/
  availability: { type: String },
  /**@name number_of_ratings*/
  number_of_ratings: { type: String },
});

const CampGround = mongoose.model("CampGround", campGroundSchema);

module.exports = CampGround; 
