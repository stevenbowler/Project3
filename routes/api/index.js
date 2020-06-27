const router = require("express").Router();
// const bookRoutes = require("./books");
const userRoutes = require("./users");
const campgroundRoutes = require("./campGrounds");

// Book routes
// router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/campgrounds", campgroundRoutes);
// router.post("/campground", (req, res) => {
//     res.json({message: "Route exists!"})
// })

module.exports = router;
