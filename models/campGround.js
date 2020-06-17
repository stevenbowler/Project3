//@ts-check
/**@module */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**@namespace campGroundSchema */
const campGroundSchema = new Schema({
  /**@name entityId*/
  entityId: { type: String, required: true },
  /**@name campGround*/
  //campsite name
  campGround: { type: String, required: true },
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
   infoLink: {  type: String, required: false },
    /**@name reservationURL*/
    reservationURL: {  type: String, required: false },
});

const CampGround = mongoose.model("CampGround", campGroundSchema);

module.exports = CampGround; 
