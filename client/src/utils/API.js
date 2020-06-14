//@ts-check
/**@module */
import axios from "axios";

export default {

    /**
   * Gets all books
   * @function getCampSites 
   * @param {*} username
   * */
  getCampSites: function (user) {
    var url = "/api/books/?name=" + user.username;
    if (user.username !== "Guest...Login") url = `/api/books/protected?name=${user.username}&email=${user.email}`; // used for protected routes in books.js
    var token = user.token;
    return axios.get(url,
      {
        headers: { 'auth-token': token },       // send token thru, booksController middleware will verify before proceeding
      });
  },

  /**
   * Gets the book with the given id
   * @function getCampSite
   * @param {*} id*/
  getCampSite: function (id) {
    return axios.get("/api/campsites/" + id);
  },

  /**
   * Deletes the book with the given id
   * @function deleteCampSites
   * @param {*} id 
   */
  deleteCampSites: function (id) {
    return axios.delete("/api/books/" + id);
  },

  /**
   * Saves a book to the database
   * @function saveCampSite
   * @param {*} campSiteData 
   */
  saveCampSite: function (campSiteData) {
    return axios.post("/api/books", campSiteData);
  }
};