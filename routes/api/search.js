//@ts-check
/**@module */
const router = require("express").Router();
const searchController = require("../../controllers/searchController");
const verify = require('../../privateRoutesAuth');



// simple logger for this router's requests
// all requests to this router will first hit this middleware (and could be used to check for valid token)
/**
 * All requests to this router will first hit this "logger" middleware, log, check token if not username "Guest...Login"
 * @function
 * @name route/
 * @memberof module:routes/api/search
 * @param {string} path - /
 * @returns {object}
 */
router.use(function (req, res, next) {
  var username = req.query.name
  console.log("username: ", username)
  console.log('Books Router Logger: %s %s %s', req.method, req.url, req.path)
  next()
});



/**
 * Check JSON Web Token is valid, if yes sets req.user, this works, 
 * *Uncomment this middleware to protect all routes below
 */
// router.use(verify, function (req, res, next) {
//   console.log("verify middleware test: ");
//   next()
// });




// Matches with "/api/books"

/**
 * Register a new user
 * @function
 * @name route/
 * @memberof module:routes/api/search
 * @param {string} path - /
 * @returns {object}
 */
router.route("/")
  .get(searchController.findAll)
  .post(searchController.create);


/**
 * Get books associated with a logged-in user, just to demonstrate a protectedroute, 
 * delete src/utils/API.js getSearch line 14 to stop using
 * @function
 * @name route/
 * @memberof module:routes/api/search
 * @param {string} path - /
 * @returns {object}
 */
router.route("/protected")
  .get(verify, searchController.findAll)     //route protected with call to verify
  .post(searchController.create);


/**
 * Matches with "/api/search/:id"
 * @function
 * @name route/:id
 * @memberof module:routes/api/search
 * @param {string} path - /:id
 * @returns {object}
 */
router
  .route("/:id")
  .get(searchController.findById)
  .put(searchController.update)
  .delete(searchController.remove);





module.exports = router;
