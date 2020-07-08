//@ts-check
/**@module */
import axios from "axios";
const BASEURL = "https://www.recreation.gov/api/search?q=";

export default {

  /**Gets all campGrounds
 * @function getCampGrounds 
 * @param {*} query
 * */
  getCampGrounds: function (query) {
    return axios.get(BASEURL + query)
  },


  /**Gets a specific Entity Id from recreation.gov
   * @function getEntityId
   * @param {*} query 
   */
  getEntityId: function (query) {
    return axios.get(BASEURL + query)
  },


  /**
   * Gets the book with the given id
   * @function getCampGround
   * @param {*} campGroundData*/
  getCampGround: function (campGroundData) {
    return axios.get("/api/campgrounds?username=" + campGroundData);
  },


  /**
   * Deletes the book with the given id
   * @function deleteCampGround
   * @param {*} id 
   */
  deleteCampGround: function (id) {
    return axios.delete("/api/campgrounds/" + id);
  },


  /**
   * Saves a book to the database
   * @function saveCampGround
   * @param {*} campGroundData 
   */
  saveCampGround: function (campGroundData) {
    return axios.post("/api/campgrounds", campGroundData);
  }
};