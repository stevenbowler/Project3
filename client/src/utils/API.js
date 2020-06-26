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

    // var url = "https://www.recreation.gov/api/search?q=92103&exact=false&radius=300&size=20&fq=-entity_type%3Atour&fq=campGround_type_of_use%3AOvernight&fq=campGround_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=2020-06-16T00%3A00%3A00Z&end_date=2020-06-20T00%3A00%3A00Z&include_unavailable=false?name=" + user.username;
    // if (user.username !== "Guest...Login") url = `/api/books/protected?name=${user.username}&email=${user.email}`; // used for protected routes in books.js
    console.log(BASEURL + query)
    return axios.get(BASEURL + query)
  },
  /**Gets a specific Entity Id from recreation.gov
   * @function getEntityId
   * @param {*} query 
   */
  getEntityId: function (query) {

    // var url = "https://www.recreation.gov/api/search?q=92103&exact=false&radius=300&size=20&fq=-entity_type%3Atour&fq=campGround_type_of_use%3AOvernight&fq=campGround_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=2020-06-16T00%3A00%3A00Z&end_date=2020-06-20T00%3A00%3A00Z&include_unavailable=false?name=" + user.username;
    // if (user.username !== "Guest...Login") url = `/api/books/protected?name=${user.username}&email=${user.email}`; // used for protected routes in books.js
    console.log(BASEURL + query)
    return axios.get(BASEURL + query)
  },
  // getCampGrounds: function (user) {
  //   var url = "https://www.recreation.gov/api/search?q=" + user.username;

  //   // var url = "https://www.recreation.gov/api/search?q=92103&exact=false&radius=300&size=20&fq=-entity_type%3Atour&fq=campGround_type_of_use%3AOvernight&fq=campGround_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=2020-06-16T00%3A00%3A00Z&end_date=2020-06-20T00%3A00%3A00Z&include_unavailable=false?name=" + user.username;
  //   // if (user.username !== "Guest...Login") url = `/api/books/protected?name=${user.username}&email=${user.email}`; // used for protected routes in books.js
  //   var token = user.token;
  //   return axios.get(url,
  //     {
  //       headers: { 'auth-token': token },       // send token thru, booksController middleware will verify before proceeding
  //     });
  // },

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
    console.log("API deletecampground: ", id);

    return axios.delete("/api/campground/" + id);
  },

  /**
   * Saves a book to the database
   * @function saveCampGround
   * @param {*} campGroundData 
   */
  saveCampGround: function (campGroundData) {
    console.log("API savecampground: ", campGroundData);
    return axios.post("/api/campgrounds", campGroundData);
  }
};